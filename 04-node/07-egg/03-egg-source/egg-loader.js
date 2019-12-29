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
      router[method](prefix + path, routes[key]);
    });
  });

  return router;
}

function loadController() {
  const controllers = {};
  load("./controller", (filename, controller) => {
    controllers[filename] = controller;
  });

  return controllers;
}

module.exports = { loadRouter, loadController };
