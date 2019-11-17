const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const router = require("koa-router")({ prefix: "/api" });

const app = new Koa();

// 设置cookie加密密钥
app.keys = ["some secret", "another secret"];

const goods = [
  { id: 1, text: "Web全栈架构师", price: 8999 },
  { id: 2, text: "Python全栈架构师", price: 8999 }
];

router.get("/goods", ctx => {
  console.log("api goods: ");

  ctx.body = {
    ok: 1,
    goods
  };
});

router.get("/detail", ctx => {
  ctx.body = {
    ok: 1,
    data: goods.find(good => good.id == ctx.query.id)
  };
});

router.post("/login", ctx => {
  const user = ctx.request.body;

  if (user.username === "admin" && user.password === "123") {
    const token = "a mock token";

    ctx.cookies.set("token", token);
    ctx.body = { ok: 1, token };
  } else {
    ctx.body = { ok: 0 };
  }
});

app.use(bodyParser());
app.use(router.routes());
app.listen(8080, () => console.log("api服务器已经启动"));
