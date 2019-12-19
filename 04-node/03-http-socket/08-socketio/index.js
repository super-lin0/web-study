const app = require("express")();
const http = require("http").Server(app);

const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", socket => {
  console.log("a user connected");

  // 响应用户发送信息
  socket.on("chat_message", msg => {
    console.log("msg:", msg);

    // 广播给所有人
    io.emit("chat_message", msg);
  });

  socket.on("disconnect", () => console.log("user disconnect"));
});

http.listen(3000, () => console.log("服务器启动，端口3000"));
