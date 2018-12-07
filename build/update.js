const path = require('path')
const fs = require('fs')
const cloneFile = require('./utils.js').cloneFile

const rootPath = path.resolve(__dirname, '../')
const fromPath = rootPath + '/tmp'
const toPath = rootPath + '/dist'

// 以下代码的作用：将tmp下面的源码，拷贝到/dist目录，

const folderList = fs.readdirSync(path.resolve(rootPath, 'tmp'))

folderList.forEach((item, i) => {
    if(item === "main.js") {
        return
    }
    fs.stat(path.resolve(fromPath, item), function (err, stat) {
        console.log(' ' + i + ' \033[32m' + item + '\033[39m')
        cloneFile(path.resolve(fromPath, item), path.resolve(toPath, item))
    })
})

// 用zollty-util.esm.js 生成index.js
cloneFile(path.resolve(fromPath, "zollty-util.es.js"), path.resolve(toPath, "index.js"))