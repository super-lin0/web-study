const Koa = require("./koa");

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "1";
  await next();
  ctx.body += 5;
});

app.use(async (ctx, next) => {
  ctx.body += "2";
  await delay();
  await next();
  ctx.body += "4";
});

app.use(async (ctx, next) => {
  ctx.body += "3";
});

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 2000);
  });
}

app.listen(3000, () => console.log("服务器启动，端口3000"));
