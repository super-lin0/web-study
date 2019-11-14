import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

//上下文是服务器传递给Vue实例的参数对象
export function createApp(context) {
  // 获取router实例
  const router = createRouter();

  // 创建Vue实例
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  });
  return { app, router };
}
