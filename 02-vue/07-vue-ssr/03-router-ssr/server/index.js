const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const resolve = dir => {
  return path.resolve(__dirname, dir);
};
// 第 1 步:开放dist/client目录，关闭默认下载index页的选项，不然到不了后面路由
// /index.html
app.use(express.static(resolve("../dist/client"), { index: false }));

// 第 2 步:获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");

// 第 3 步:导入服务端打包文件
const bundle = require(resolve("../dist/server/vue-ssr-server-bundle.json"));

// 第 4 步:创建渲染器
const template = fs.readFileSync(resolve("../public/index.html"), "utf-8");
const clientManifest = require(resolve(
  "../dist/client/vue-ssr-client- manifest.json"
));

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  template, // 宿主文件
  clientManifest // 客户端清单
});

// 路由是通配符，表示所有url都接受
app.get("*", async (req, res) => {
  console.log(req.url);

  // 设置url和title两个重要参数
  const context = {
    title: "ssr test",
    url: req.url
  };
  const html = await renderer.renderToString(context);
  res.send(html);
});
const port = 3001;
app.listen(port, function() {
  // eslint-disable-next-line no-console
  console.log(`server started at localhost:${port}`);
});
