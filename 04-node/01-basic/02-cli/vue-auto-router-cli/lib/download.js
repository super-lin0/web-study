const ora = require("ora");
const { promisify } = require("util");
const download = promisify(require("download-git-repo"));

async function clone(repo, dest) {
  const process = ora(`下载...项目`);
  process.start();
  // 第三方模块，从git上下载代码
  try {
    await download(repo, dest);
    process.succeed();
  } catch {
    process.fail();
  }
}
exports.clone = clone;
