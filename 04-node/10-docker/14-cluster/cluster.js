const cluster = require("cluster");
const os = require("os");
const process = require("process");

const numCPUs = os.cpus().length;

// 存储进程
const workers = {};

// 是否是cluster集群的主进程
if (cluster.isMaster) {
  // 监控退出事件，退出之后重启
  cluster.on("exit", (worker, code, signal) => {
    console.log("工作进程关闭, 重启中。。。");
    delete workers[worker.process.pid];
    worker = cluster.fork();
    workers[worker.process.pid] = worker;
  });

  console.log("numCPUs:", numCPUs);
  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    console.log("init .... pid", worker.process.pid);
    workers[worker.process.pid] = worker;
  }
} else {
  // 工作进程
  const app = require("./app");
  app.listen(3000, () => console.log("服务器启动，端口3000"));
}

// 手动执行exit(Ctrl + C),
process.on("SIGTERM", () => {
  console.log("process exit");
  for (let pid in workers) {
    process.kill(pid);
  }

  // 全部退出
  process.exit(0);
});

require("./test");
