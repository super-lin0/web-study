const http = require("http");

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }

    // 观察cookie
    console.log("cookie::", req.headers.cookie);

    // 设置cookie
    res.setHeader("Set-cookie", "cookie=abc;");
    res.end("Hello Cookie");
  })
  .listen(3000, () => console.log("服务器启动，端口3000"));
