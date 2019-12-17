const net = require("net");

const chatServer = net.createServer();
const clientList = [];

// 客户端连接回调
chatServer.on("connection", client => {
  client.write("Hi \n");
  clientList.push(client);

  // 客户端发送信息回调
  client.on("data", data => {
    console.log(data.toString());

    // 广播
    clientList.forEach(v => v.write(data));
  });
});

chatServer.listen(9000);
