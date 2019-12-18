const express = require("express");

const app = express();

app.use(express.static(__dirname + "/"));

app.listen(3000, () => console.log("服务器启动，端口3000"));
