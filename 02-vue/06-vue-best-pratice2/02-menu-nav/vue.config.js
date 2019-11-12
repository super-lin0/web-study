const path = require("path");

const port = 7070;
const title = "Vue最佳实践";

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: "best-pratice",
  devServer: {
    port
  },

  configureWebpack: {
    name: title
  },

  chainWebpack(cfg) {
    cfg.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();

    cfg.module
      .rule("icon")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  }
};
