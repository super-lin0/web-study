const http = require("http");

const server = http.createServer((req, res) => {
  console.log("req", getPrototypeChain(req));
  console.log("res", getPrototypeChain(res));
  res.end("Hello Node");
});

server.listen(3000);

function getPrototypeChain(obj) {
  const protoChain = [];
  while ((obj = Object.getPrototypeOf(obj))) {
    protoChain.push(obj);
  }
  return protoChain;
}
