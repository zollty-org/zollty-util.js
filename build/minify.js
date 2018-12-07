const path = require('path')
const fs = require('fs')
const Terser = require("terser");
const files = require("./minify-file");

const rootPath = path.resolve(__dirname, '../')
const mainPath = rootPath + '/tmp'
console.log("mainPath: " + mainPath);

function minifyFn(name) {
  var file = name + '.js';
  var code = {};
  code[file] = fs.readFileSync(path.resolve(mainPath, file), "utf8")
  var options = {
    sourceMap: {
      url: name + ".min.js.map"
    }
  };
  var result = Terser.minify(code, options);

  fs.writeFile(path.resolve(mainPath, name + ".min.js"), result.code, function (err) {
    if (err) {
      console.log(err);
    }
  });
  fs.writeFile(path.resolve(mainPath, name + ".min.js.map"), result.map, function (err) {
    if (err) {
      console.log(err);
    }
  });
  // console.log(result.code); // minified output
  // console.log('--------------------');
  // console.log(result.map); // source map
}

for (var i = 0; i < files.length; i++) {
  minifyFn(files[i]);
}
