const http = require("http");

const context = require("./context");
const request = require("./request");
const response = require("./response");
const compose = require("./compose");

class Koa {
  constructor() {
    this.middlewares = [];
  }

  listen(...args) {
    const server = http.createServer(async (req, res) => {
      // this.callback(req, res);
      let ctx = this.createContext(req, res);

      // 中间件合成
      const fn = compose(this.middlewares);

      // 执行合成函数
      await fn(ctx);

      // this.callback(ctx);

      res.end(ctx.body);
    });

    server.listen(...args);
  }
  // use(callback) {
  //   this.callback = callback;
  // }
  use(middleware) {
    this.middlewares.push(middleware);
  }

  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);

    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;

    return ctx;
  }
}

module.exports = Koa;
