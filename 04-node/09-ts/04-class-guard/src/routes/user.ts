import * as Koa from "koa";
import { get, post, middlewares } from "../utils/route-decorators";

const users = [
  { name: "tom", age: 20 },
  { name: "tom", age: 12 }
];

@middlewares([
  // 鉴权
  async function guard(ctx: Koa.Context, next: () => Promise<any>) {
    if (ctx.header.token) {
      await next();
    } else {
      throw "请登录";
    }
  }
])
export default class User {
  @get("/users")
  public list(ctx: Koa.Context) {
    ctx.body = { ok: 1, data: users };
  }

  @post("/users", {
    middlewares: [
      async function validation(ctx: Koa.Context, next: () => Promise<any>) {
        const name = ctx.request.body.name;

        if (!name) {
          throw "请输入用户名";
        } else {
          await next();
        }
      }
    ]
  })
  public add(ctx: Koa.Context) {
    users.push(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
