const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (url === "/" && method === "GET") {
    fs.readFile("./index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain;charset=utf-8" });
        res.end("500 服务器错误");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  } else if (url === "/user" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ name: "zhangsan" }));
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain:charset=utf-8");
    res.end("404-页面未找到");
  }
});

server.listen(3000);
