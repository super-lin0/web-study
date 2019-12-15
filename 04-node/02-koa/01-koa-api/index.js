const Koa = require("koa");

const app = new Koa();

app.use(async (ctx, next) => {
  const start = new Date().getTime();
  console.log(`start: ${ctx.url}`);
  await next();
  const end = new Date().getTime();
  console.log(
    `end 请求${ctx.url}: ${JSON.stringify(ctx.body)} 耗时${parseInt(
      end - start
    )}ms`
  );
});

app.use((ctx, next) => {
  console.log("get name");

  ctx.body = [
    {
      name: "zhangsan"
    }
  ];
});

app.listen(3000);
