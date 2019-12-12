const fs = require("fs");

// 创建读取流
const rs = fs.createReadStream("./05-http/1.JPG");
// 创建写流
const ws = fs.createWriteStream("./2.JPG");

// 连接读取流和写入流（其实完成复制）
rs.pipe(ws);
