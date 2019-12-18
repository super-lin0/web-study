const express = require("express");

const app = express();

app.use(express.static(__dirname + "/"));

const proxy = require("http-proxy-middleware");

app.use(
  "/api",
  proxy({
    target: "http://localhost:4000"
  })
);

app.listen(3000, () => console.log("服务器启动，端口3000"));
