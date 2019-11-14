/**
 * 给服务器提供一个方法，可以根据接收的url设置路由地址，然后返回创建的Vue实例
 */

import { createApp } from "./main.js";

export default context => {
  return new Promise((resolve, reject) => {
    // 获取Vue实例
    const { app, router, store } = createApp(context);

    // 跳转至首屏
    router.push(context.url);

    // onReady完成时，异步的任务（异步组件，异步请求）都会结束
    router.onReady(() => {
      // 获取匹配的路由组件数组
      const matchedComponents = router.getMatchedComponents();

      // 若无匹配则抛出异常
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }

      // 对所有匹配的路由组件调用可能存在的`asyncData()`
      Promise.all(
        matchedComponents.map(Component => {
          if (Component.asyncData) {
            return Component.asyncData({
              store,
              route: router.currentRoute
            });
          }
        })
      )
        .then(() => {
          // 所有预取钩子 resolve 后，
          // store 已经填充入渲染应用所需状态
          // 将状态附加到上下文，且 `template` 选项用于 renderer 时，
          // 状态将自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
          context.state = store.state;
          resolve(app);
        })
        .catch(reject);
    }, reject);
  });
};
