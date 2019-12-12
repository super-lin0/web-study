const http = require("http");

const server = http.createServer((req, res) => {
  console.log("req");
  res.end("Hello Node");
});

server.listen(3000);
