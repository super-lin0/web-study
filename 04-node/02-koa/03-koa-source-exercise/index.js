const Koa = require("./koa/index");
const app = new Koa();

// app.use((req, res) => {
//   res.writeHead(200);
//   res.end("Hello World");
// });

app.use(ctx => {
  ctx.body = "Hello World123";
});

app.listen(3000, () => console.log("服务器启动，端口3000"));
