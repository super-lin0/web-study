const Koa = require("koa");
const router = require("koa-router")();
const session = require("koa-session");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
const static = require("koa-static");
const app = new Koa();

//配置session的中间件
app.use(
  cors({
    credentials: true
  })
);

app.keys = ["some secret"];
app.use(static(__dirname + "/"));
app.use(bodyParser());
app.use(session(app));

// 鉴权
app.use((ctx, next) => {
  if (ctx.url.indexOf("login") > -1) {
    next();
  } else {
    // 判断登录态
    console.log("ctx.session", ctx.session);

    if (!ctx.session.userinfo) {
      ctx.body = {
        message: "登录失败"
      };
    } else {
      next();
    }
  }
});

router.post("/users/login", async ctx => {
  const { body } = ctx.request;

  // 直接授权,设置session
  ctx.session.userinfo = body.username;
  ctx.body = {
    message: "登录成功"
  };
});

router.post("/users/logout", async ctx => {
  // 清除
  delete ctx.session.userinfo;
  ctx.body = {
    message: "注销成功"
  };
});

router.get("/users/getUser", async ctx => {
  ctx.body = {
    message: "获取用户信息",
    userinfo: ctx.session.userinfo
  };
});

app.use(router.routes());

app.listen(3000, () => console.log("服务器启动，端口3000"));
