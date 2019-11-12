const path = require("path");
const bodyParser = require("body-parser");

const port = 7070;
const title = "vue最佳实践";

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/best-practice",
  devServer: {
    port,
    proxy: {
        // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
        [process.env.VUE_APP_BASE_API]: {
          target: `http://127.0.0.1:3000/`,
          changeOrigin: true,
          pathRewrite: {
            ["^" + process.env.VUE_APP_BASE_API]: ""
          }
        }
      },
    // before: app => {
    //   // 设置参数处理中间件
    //   app.use(bodyParser.json()); // post参数
    //   // url参数 
    //   app.use(
    //     bodyParser.urlencoded({
    //       extended: true,
    //     }),
    //   );

    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;

    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username,
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误",
    //       });
    //     }
    //   });

    //   app.get("/dev-api/user/info", (req, res) => {
    //     //   请求头获取token
    //     const auth = req.headers["authorization"];
    //     // 转换为响应的roles
    //     const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({
    //       code: 1,
    //       data: roles,
    //     });
    //   });
    // },
  },
  configureWebpack: {
    name: title,
  },
  chainWebpack(config) {
    // 对config进行链式操作即可修改loader、plugins
    // 1.svg rule中要排除icons目录
    console.log(resolve("src/icons"));

    config.module.rule("svg").exclude.add(resolve("src/icons"));

    // 2.添加一个规则icons
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({ symbolId: "icon-[name]" });
  },
};
