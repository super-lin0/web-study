const http = require("http");

const session = {};

http
  .createServer((req, res) => {
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }

    // 观察cookie
    console.log("cookie::", req.headers.cookie);

    const sessionKey = "sid";
    const cookie = req.headers.cookie;

    if (cookie && cookie.indexOf(sessionKey) > -1) {
      res.end("Come back");

      const pattern = new RegExp(`${sessionKey}=([^;]+);?\s*`);
      const sid = pattern.exec(cookie)[1];

      console.log("session", sid, session[sid]);
    } else {
      const sid = (Math.random() * 999999).toFixed();
      res.setHeader("Set-cookie", `${sessionKey}=${sid};`);
      session[sid] = { name: "laondskj" };
      res.end("Hello");
    }
    // 设置cookie
    res.end("Hello Cookie");
  })
  .listen(3000, () => console.log("服务器启动，端口3000"));
