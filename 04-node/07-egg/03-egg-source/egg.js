const Koa = require("koa");

const { loadRouter, loadController } = require("./egg-loader");

class Egg {
  constructor(conf) {
    this.$app = new Koa(conf);
    this.$ctrl = loadController();
    this.$router = loadRouter(this);
    this.$app.use(this.$router.routes());
  }

  start(port) {
    this.$app.listen(port, () => console.log(`服务器启动，端口${port}`));
  }
}

module.exports = Egg;
