import * as Koa from "koa";
import { get, post, middlewares } from "../utils/route-decorators";
import model from "../model/user";

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
  async list(ctx: Koa.Context) {
    // ctx.body = { ok: 1, data: users };
    const users = await model.findAll();
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
  async add(ctx: Koa.Context) {
    await model.create(ctx.request.body);
    ctx.body = { ok: 1 };
  }
}
