const http = require("http");
const server = http.createServer((req, res) => {
  Math.random() > 0.5 ? aa() : 2;
  res.end("Hello Node");
});

if (!module.parent) {
  server.listen(3000);
  console.log("服务器启动，端口3000");
} else {
  module.exports = server;
}
