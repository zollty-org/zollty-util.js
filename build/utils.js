const fs = require('fs')

function cloneFile(src, dst) {
    var rs = fs.createReadStream(src);
    var ws = fs.createWriteStream(dst);
    rs.on('data', function (chunk) {
        if (ws.write(chunk) === false) { //ws.write()  判断数据流是否已经写入目标了
            rs.pause();
        }
    });
    rs.on('end', function () {
        ws.end();
    });
    ws.on('drain', function () {
        rs.resume(); //从新启动读取数据流
    });
}

/**
 * 清空目录（如果没有目录，则创建）
 */
function initFolder(path) {
    if (fs.existsSync(path)) {
        console.log("find tmp dir.");
        var files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (!fs.statSync(curPath).isDirectory()) {
                // delete file
                fs.unlinkSync(curPath);
            }
        });
    } else {
        fs.mkdirSync(path);
        console.log("create tmp dir success.");
    }
};

module.exports = {
    cloneFile: cloneFile,
    initFolder: initFolder
};