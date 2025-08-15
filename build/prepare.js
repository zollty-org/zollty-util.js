const path = require("path");
const fs = require("fs");
const os = require("os");
const { cloneFile, initFolder } = require("./utils");
const { refactorImport } = require("./tools");

const rootPath = path.resolve(__dirname, "../");
const fromPath = rootPath + "/src";
const toPath = rootPath + "/tmp";
console.log("rootPath: " + rootPath);

// 先清空目录（如果没有目录，则创建）
initFolder(toPath);

// 以下代码的作用：将src下面的源码，拷贝到/tmp目录，
// 并生成zollty-util.esm.default.js和zollty-util.esm.js

const mesm = fs.createWriteStream(
  path.resolve(toPath, "zollty-util.esm.default.js")
);
const mdes = fs.createWriteStream(path.resolve(toPath, "zollty-util.esm.js"));
const gg = [];

let folderList = fs.readdirSync(path.resolve(rootPath, "src"));

// Process all directories first to collect imports
folderList.forEach((item, i) => {
  var sstats = fs.statSync(path.resolve(fromPath, item));

  if (sstats && sstats.isDirectory()) {
    let subFolder = fs.readdirSync(path.resolve(fromPath, item));
    subFolder.forEach((ff, j) => {
      let attr = ff.substring(0, ff.lastIndexOf("."));
      gg.push(attr);
      mesm.write("import " + attr + " from './" + attr + ".js';" + os.EOL);
      mdes.write(
        "export { default as " + attr + " } from './" + attr + ".js';" + os.EOL
      );
    });
  }
  console.log("dir " + i + ": " + item);
});

mesm.write(os.EOL);
mesm.write("export default {" + os.EOL);
for (let index = 0; index < gg.length; index++) {
  mesm.write("  " + gg[index] + "," + os.EOL);
}
mesm.write("}" + os.EOL);
mdes.write("export { default } from './zollty-util.esm.default.js';" + os.EOL);

// Track all promises for async operations
const pendingOperations = [];

// Process directories and files
folderList.forEach((item, i) => {
  var sstats = fs.statSync(path.resolve(fromPath, item));

  if (sstats && sstats.isDirectory()) {
    console.log(" |" + i + " \033[36m" + item + "/\033[39m");
    var out = fs.createWriteStream(path.resolve(toPath, item + ".default.js"));
    var mdr = fs.createWriteStream(path.resolve(toPath, item + ".js"));

    let subFolder = fs.readdirSync(path.resolve(fromPath, item));
    const tg = [];
    subFolder.forEach((ff, j) => {
      let attr = ff.substring(0, ff.lastIndexOf("."));
      console.log(" |--" + j + " \033[35m" + attr + "\033[39m");
      tg.push(attr);
      out.write("import " + attr + " from './" + attr + ".js';" + os.EOL);
      mdr.write(
        "export { default as " + attr + " } from './" + attr + ".js';" + os.EOL
      );
      // 对import进行处理
      refactorImport(
        path.resolve(fromPath + "/" + item, ff),
        path.resolve(toPath, ff)
      );
    });

    out.write(os.EOL);
    out.write("export default {" + os.EOL);
    for (let index = 0; index < tg.length; index++) {
      out.write("  " + tg[index] + "," + os.EOL);
    }
    out.write("}");

    // Create promises to track when streams are finished
    const outPromise = new Promise((resolve) => {
      out.end();
      out.on("finish", resolve);
    });
    pendingOperations.push(outPromise);

    const mdrPromise = new Promise((resolve) => {
      mdr.write(
        "export { default } from './" + item + ".default.js" + "';" + os.EOL
      );
      mdr.end();
      mdr.on("finish", resolve);
    });
    pendingOperations.push(mdrPromise);
  } else {
    console.log(" |" + i + " \033[32m" + item + "\033[39m");
    cloneFile(path.resolve(fromPath, item), path.resolve(toPath, item));
  }
});

// Properly end main streams and wait for them to finish
const mesmPromise = new Promise((resolve) => {
  mesm.end();
  mesm.on("finish", resolve);
});

const mdesPromise = new Promise((resolve) => {
  mdes.end();
  mdes.on("finish", resolve);
});

// Wait for all operations to complete before doing post-processing
Promise.all([mesmPromise, mdesPromise, ...pendingOperations])
  .then(() => {
    // Now all files are guaranteed to be written
    cloneFile(
      path.resolve(toPath, "zollty-util.esm.default.js"),
      path.resolve(toPath, "main.js")
    );

    // 特殊处理bom.js
    const bomDefaultPath = path.resolve(toPath, "bom.default.js");
    const bomPath = path.resolve(toPath, "bom.js");

    // Check if bom.default.js exists before trying to copy it
    if (fs.existsSync(bomDefaultPath)) {
      cloneFile(bomDefaultPath, bomPath);

      // Add a small delay before trying to unlink
      setTimeout(() => {
        if (fs.existsSync(bomDefaultPath)) {
          fs.unlinkSync(bomDefaultPath);
        }
      }, 100);
    }
  })
  .catch((err) => {
    console.error("Build preparation failed:", err);
    process.exit(1);
  });
