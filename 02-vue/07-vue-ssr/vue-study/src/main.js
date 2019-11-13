import Vue from "vue";
import App from "./App.vue";
import { createRouter } from "./router";

// context是服务器传递给vue实例的参数对象
export function createApp(context) {
  // 1.获取router实例
  const router = createRouter();
  // 2.创建vue实例
  const app = new Vue({
    router,
    context,
    render: h => h(App)
  });
  return { app, router };
}
