/**
 * 挂载创建的Vue实例
 */
import { createApp } from "./main";

// 创建Vue实例
const { app, router } = createApp();

// 路由挂载，激活过程
router.onReady(() => {
  app.$mount("#app");
});
