import * as Koa from "koa";
import * as bodify from "koa-body";
import * as serve from "koa-static";
import * as timing from "koa-xtime";
import { resolve } from "path";

import { load } from "./utils/route-decorator";

const app = new Koa();

app.use(timing());

app.use(serve(`${__dirname}/public`));

app.use(
  bodify({
    multipart: true,
    strict: false // 使用非严格模式
  })
);

const router = load(resolve(__dirname, "./routes"));
app.use(router.routes());

app.listen(3000, () => console.log("服务器启动，端口3000"));
