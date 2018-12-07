const fs = require('fs')
const {
  cloneFile
} = require('./utils')

/**
 * 对import进行处理，
 * 将import strTemplate from '../string/strTemplate'，
 * 转换成 import strTemplate from './strTemplate'
 */
function refactorImport(inPath, outPath) {
  var code = fs.readFileSync(inPath, "utf8")
  var regex = /from \'\.\.\/.+\'/g;

  var result = regex.exec(code);
  var match = [];
  while (result != null) {
    // console.log(result[0])
    match.push(result[0])
    result = regex.exec(code);
  }

  if (match.length < 1) {
    cloneFile(inPath, outPath);
    return;
  }

  for (var i = 0; i < match.length; i++) {
    var ss = match[i];
    var p = ss.lastIndexOf('/');
    // console.log(ss.slice(p))
    code = code.replace(new RegExp(ss), "from '." + ss.slice(p));
  }
  // console.log(code)

  fs.writeFile(outPath, code, function (err) {
    if (err) {
      console.log(err);
    }
  });

}

// for test

// const path = require('path')
// const rootPath = path.resolve(__dirname, '../')
// const toPath = rootPath + '/tmp'
// console.log("rootPath: " + rootPath);

// refactorImport(path.resolve(toPath, 'htmlTemplate.js'), path.resolve(toPath, 'htmlTemplate1.js'))

module.exports = {
  refactorImport: refactorImport
}
