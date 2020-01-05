import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as timing from "koa-xtime";

const app = new Koa();

app.use(timing());

app.use(serve(`${__dirname}/public`));

app.use(
  bodify({
    multipart: true,
    strict: false // 使用非严格模式
  })
);

app.use((ctx: Koa.Context) => {
  ctx.body = "hello ts";
});

app.listen(3000, () => console.log("服务器启动，端口3000"));
