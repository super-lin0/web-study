const Koa = require("koa");
const app = new Koa();

const session = require("koa-session");

// 负责加密用的密钥
app.keys = ["some secret"];

const SESS_CONFIG = {
  key: "www:sess",
  maxAge: 86400000,
  httpOnly: true,
  signed: true
};

// 注册session
app.use(session(SESS_CONFIG, app));

app.use(ctx => {
  if (ctx.path === "/favicon.ico") {
    return;
  }

  // 获取cookie
  let n = ctx.session.count || 0;

  // 设置
  ctx.session.count = ++n;

  ctx.body = "第" + n + "次访问";
});

app.listen(3000, () => console.log("服务器启动, 端口3000"));
