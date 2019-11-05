// 每办理完一个业务，柜员就会问当前的客户，是否还有其他需要办理的业务。（检查还有没有微任务需要处理）
// 而客户明确告知说没有事情以后，柜员就去查看后边还有没有等着办理业务的人。（结束本次宏任务、检查还有没有宏任务需要处理）
// Event Loop。
// 同步>异步，微任务>宏任务
console.log(6);
setTimeout(() => console.log("4"), 0); // 微任务

// 宏任务
// new Promise在实例化的过程中所执行的代码都是同步进行的();
// 而then中注册的回调才是异步执行的。
new Promise(resolve => {
  resolve();
  console.log(1);
}).then(_ => {
  new Promise(resolve => {
    resolve();
    console.log(5);
  }).then(_ => console.log(7));
  console.log(3);
});

console.log(2);
