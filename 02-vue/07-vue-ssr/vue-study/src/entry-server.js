// 给服务器提供一个方法，可以根据接收url设置路由地址，然后返回创建Vue实例
// 在服务器执行
import { createApp } from "./main";

export default context => {
  return new Promise((resolve, reject) => {
    // 获取vue/router实例
    const { app, router } = createApp(context);

    // 跳转至首屏
    router.push(context.url);

    // onReady完成时，异步的任务都会结束
    router.onReady(() => {
        resolve(app);
    }, reject);
  });
};
