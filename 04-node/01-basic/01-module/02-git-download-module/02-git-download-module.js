const download = require("download-git-repo");

// 第三方模块，从git上下载代码
download("github:super-lin0/my-utils", "test", err => {
  console.log(err ? "Error" + err : "success");
});
