const Koa = require("koa");
const router = require("koa-router")();
const jwt = require("jsonwebtoken");
const jwtAuth = require("koa-jwt");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");

const secret = "it's a secret";
const app = new Koa();

app.keys = ["some secret"];

app.use(static(__dirname + "/"));
app.use(bodyParser());

router.post("/users/login-token", async ctx => {
  const { body } = ctx.request;

  // 登录逻辑
  const userinfo = body.username;
  // 设置token
  ctx.body = {
    message: "登录成功",
    user: userinfo,
    // 生成token
    token: jwt.sign(
      {
        data: userinfo,
        // 设置有效期
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 1
      },
      secret
    )
  };
});

router.get(
  "/users/getUser-token",
  // 用于鉴权
  jwtAuth({
    secret
  }),
  async ctx => {
    ctx.body = {
      message: "获取用户数据成功",
      userinfo: ctx.state.user.data
    };
  }
);

app.use(router.routes());
app.listen(3000, () => console.log("服务器启动，端口3000"));
