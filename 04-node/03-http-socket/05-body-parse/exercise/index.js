const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const { method, url } = req;

    if (method === "GET" && url === "/") {
      fs.readFile("./index.html", (err, data) => {
        res.setHeader("Content-Type", "text/html");
        res.end(data);
      });
    } else if (method === "GET" && url === "/api/users") {
      res.end(JSON.stringify({ name: "zhangsan" }));
    } else if (method === "POST" && url === "/api/users") {
      let reqData = [];
      let size = 0;

      req.on("data", data => {
        console.log("data", data.toString());
        reqData.push(data);
        size += data.length;
      });

      req.on("end", () => {
        console.log("end=====");
        const data = Buffer.concat(reqData, size);

        console.log(`data`, size, data.toString());
        res.end(`form data ${data.toString()}`);
      });
    }
  })
  .listen(3000, () => console.log("服务器启动，端口3000"));
