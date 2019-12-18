const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { method, url } = req;

    console.log("url: " + url);
    console.log("method: " + method);
    console.log("cookie", req.headers.cookie);

    if (method === "GET" && url === "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method === "GET" && url === "/api/users") {
      res.setHeader("Set-Cookie", "cookie1=va22");

      res.end(JSON.stringify({ name: "zhangsan" }));
    }
  })
  .listen(4000, () => console.log("服务器启动，端口4000"));
