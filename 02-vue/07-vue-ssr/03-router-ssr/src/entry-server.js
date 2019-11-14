/**
 * 给服务器提供一个方法，可以根据接收的url设置路由地址，然后返回创建的Vue实例
 */

import { createApp } from "./main.js";

export default context => {
  return new Promise((resolve, reject) => {
    // 获取Vue实例
    const { app, router } = createApp(context);

    // 跳转至首屏
    router.push(context.url);

    // onReady完成时，异步的任务（异步组件，异步请求）都会结束
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
};
