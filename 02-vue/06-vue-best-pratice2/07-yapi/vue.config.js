// const bodyParser = require("body-parser");

const path = require("path");

const port = 7070;
const title = "Vue最佳实践";

const resolve = dir => path.join(__dirname, dir);

module.exports = {
  publicPath: "best-pratice",
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://yapi.demo.qunar.com/mock/34166/best-pratice/`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ""
        }
      }
    }

    // before: app => {
    //   app.use(bodyParser.json());
    //   app.use(
    //     bodyParser.urlencoded({
    //       extended: true
    //     })
    //   );
    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;
    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误"
    //       });
    //     }
    //   });
    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"];
    //     const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({
    //       code: 1,
    //       data: roles
    //     });
    //   });
    // }
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
