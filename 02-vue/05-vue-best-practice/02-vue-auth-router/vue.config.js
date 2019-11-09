const path = require("path");

const port = 7070;
const title = "Vue最佳实践";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "best-pratice", // 部署应用包的基本URL
  devServer: {
    port
  },
  configureWebpack: {
    // 向index.html注入title
    name: title
  },
  chainWebpack(cfg) {
    // 对cfg进行链式操作，即可修改loader、plugins
    // vue inspect --rules/vue inspect --rule svg
    // svg rule中排除icons目录
    cfg.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    // 添加一个rule:icon
    cfg.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  }
};
