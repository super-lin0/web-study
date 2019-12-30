const fs = require("fs");
const path = require("path");

const Router = require("koa-router");

// 读取文件
function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir);

  const files = fs.readdirSync(url);

  files.forEach(filename => {
    filename = filename.replace(".js", "");
    const file = require(url + "/" + filename);
    cb(filename, file);
  });
}

// 路由加载
function loadRouter(app) {
  const router = new Router();
  load("./routes", (filename, routes) => {
    // 处理index
    const prefix = filename === "index" ? "" : `/${filename}`;

    routes = typeof routes === "function" ? routes(app) : routes;

    // 遍历
    Object.keys(routes).forEach(key => {
      // "get /"
      const [method, path] = key.split(" ");
      console.log(
        `映射地址，, ${method.toLocaleLowerCase()}, ${prefix}${path}`
      );
      // router[method](prefix + path, routes[key]);
      router[method](prefix + path, async ctx => {
        app.ctx = ctx;
        await routes[key](app);
      });
    });
  });

  return router;
}

function loadController(app) {
  const controllers = {};
  load("./controller", (filename, controller) => {
    controllers[filename] = controller(app);
  });

  return controllers;
}

function loadService(app) {
  const services = {};
  load("./service", (filename, service) => {
    services[filename] = service(app);
  });

  return services;
}

const Sequelize = require("sequelize");

function loadConfig(app) {
  load("conf", (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db);

      // 加载模型
      app.$model = {};
      load("model", (filename, { schema, options }) => {
        app.$model[filename] = app.$db.define(filename, schema, options);
      });
      app.$db.sync();
    }

    if (conf.middlewares) {
      conf.middlewares.forEach(mid => {
        const midPath = path.resolve(__dirname, "middleware", mid);
        app.$app.use(require(midPath));
      });
    }
  });
}

const schedule = require("node-schedule");
function loadSchedule() {
  load("./schedule", (filename, scheduleCfg) => {
    schedule.scheduleJob(scheduleCfg.interval, scheduleCfg.handler);
  });
}

module.exports = {
  loadRouter,
  loadController,
  loadService,
  loadConfig,
  loadSchedule
};
