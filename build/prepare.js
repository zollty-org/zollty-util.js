const path = require('path')
const fs = require('fs')
const os = require('os')
const {
  cloneFile,
  initFolder
} = require('./utils')
const {
  refactorImport
} = require('./tools')

const rootPath = path.resolve(__dirname, '../')
const fromPath = rootPath + '/src'
const toPath = rootPath + '/tmp'
console.log("rootPath: " + rootPath);

// 先清空目录（如果没有目录，则创建）
initFolder(toPath);

// 以下代码的作用：将src下面的源码，拷贝到/tmp目录，
// 并生成zollty-util.esm.default.js和zollty-util.esm.js

const mesm = fs.createWriteStream(path.resolve(toPath, 'zollty-util.esm.default.js'))
const mdes = fs.createWriteStream(path.resolve(toPath, 'zollty-util.esm.js'))
const gg = []

let folderList = fs.readdirSync(path.resolve(rootPath, 'src'))
folderList.forEach((item, i) => {

  var sstats = fs.statSync(path.resolve(fromPath, item));

  if (sstats && sstats.isDirectory()) {
    let subFolder = fs.readdirSync(path.resolve(fromPath, item))
    subFolder.forEach((ff, j) => {
      let attr = ff.substring(0, ff.lastIndexOf('.'));
      gg.push(attr)
      mesm.write('import ' + attr + ' from \'./' + attr + '.js\';' + os.EOL);
      mdes.write('export { default as ' + attr + ' } from \'./' + attr + '.js\';' + os.EOL);
    })
  }

  fs.stat(path.resolve(fromPath, item), function (err, stat) {
    if (stat && stat.isDirectory()) {
      console.log(' |' + i + ' \033[36m' + item + '/\033[39m');
      var out = fs.createWriteStream(path.resolve(toPath, item + '.default.js'))
      var mdr = fs.createWriteStream(path.resolve(toPath, item + '.js'))

      let subFolder = fs.readdirSync(path.resolve(fromPath, item))
      const tg = [];
      subFolder.forEach((ff, j) => {
        let attr = ff.substring(0, ff.lastIndexOf('.'));
        console.log(' |--' + j + ' \033[35m' + attr + '\033[39m');
        tg.push(attr)
        out.write('import ' + attr + ' from \'./' + attr + '.js\';' + os.EOL);
        mdr.write('export { default as ' + attr + ' } from \'./' + attr + '.js\';' + os.EOL);
        // cloneFile(__dirname + '/src/' + item + '/' + ff, __dirname + '/tmp/' + ff);
        // 对import进行处理
        refactorImport(path.resolve(fromPath + '/' + item, ff), path.resolve(toPath, ff));
        // cloneFile(path.resolve(fromPath + '/' + item, ff), path.resolve(toPath, ff));
      })
      out.write(os.EOL)
      out.write('export default {' + os.EOL)
      for (let index = 0; index < tg.length; index++) {
        // console.log(tg[index]);
        out.write('  ' + tg[index] + ',' + os.EOL)
      }
      out.write('}')
      mdr.write('export { default } from \'./' + item + '.default.js' + '\';' + os.EOL)
    } else {
      console.log(' |' + i + ' \033[32m' + item + '\033[39m');
      // cloneFile(__dirname + '/src/' + item, __dirname + '/tmp/' + item);
      cloneFile(path.resolve(fromPath, item), path.resolve(toPath, item));
    }
  });
  console.log('dir ' + i + ': ' + item)
})

mesm.write(os.EOL)
mesm.write('export default {' + os.EOL)
for (let index = 0; index < gg.length; index++) {
  mesm.write('  ' + gg[index] + ',' + os.EOL)
}
mesm.write('}' + os.EOL)
mdes.write('export { default } from \'./zollty-util.esm.default.js\';' + os.EOL)

mesm.end();
mdes.end();
mesm.on('close', () => {
  cloneFile(path.resolve(toPath, 'zollty-util.esm.default.js'),
    path.resolve(toPath, 'main.js'));

  // 特殊处理bom.js
  cloneFile(path.resolve(toPath, 'bom.default.js'),
    path.resolve(toPath, 'bom.js'));
  fs.unlinkSync(path.resolve(toPath, 'bom.default.js'));
});
