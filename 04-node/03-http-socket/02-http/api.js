const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { method, url } = req;

    console.log("url: " + url);
    console.log("method: " + method);

    if (method === "GET" && url === "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method === "GET" && url === "/api/users") {
      // 允许3000源访问我
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ name: "zhangsan" }));
    } else if (method === "OPTIONS" && url === "/api/users") {
      // 预检请求
      res.writeHead(200, {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Headers": "X-Token,Content-Type",
        "Access-Control-Allow-Methods": "PUT"
      });
      res.end();
    }
  })
  .listen(4000, () => console.log("服务器启动，端口4000"));
