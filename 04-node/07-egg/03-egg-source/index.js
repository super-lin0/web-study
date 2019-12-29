// const app = new (require("koa"))();

// const { loadRouter } = require("./koa-loader");

// app.use(loadRouter().routes());

// app.listen(3000, () => console.log("服务器启动，端口3000"));

const koa = require("./egg");

const app = new koa();
app.start(3000);
