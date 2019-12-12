const download = require("download-git-repo");
const ora = require("ora");

const process = ora(`下载...项目`);

process.start();
// 第三方模块，从git上下载代码
download("github:super-lin0/my-utils", "test", err => {
  // console.log(err ? "Error" + err : "success");
  if (err) {
    process.fail();
  } else {
    process.succeed();
  }
});
