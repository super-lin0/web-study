const Koa = require("./koa/index");
const app = new Koa();

const Router = require("./router");

const router = new Router();

router.get("/index", async ctx => {
  ctx.body = "index page";
});
router.get("/post", async ctx => {
  ctx.body = "post page";
});
router.get("/list", async ctx => {
  ctx.body = "list page";
});
router.post("/index", async ctx => {
  ctx.body = "post page";
});

app.use(router.routes());
app.listen(3000, () => console.log("服务器启动，端口3000"));
