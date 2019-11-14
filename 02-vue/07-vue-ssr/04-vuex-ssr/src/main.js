import Vue from "vue";
import App from "./App.vue";

import { createRouter } from "./router";
import { createStore } from "./store";

// 确保客户端每个组件如果有asyncData，要执行之
Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      });
    }
  }
});

//上下文是服务器传递给Vue实例的参数对象
export function createApp(context) {
  // 获取router实例
  const router = createRouter();

  // 获取Store实例
  const store = createStore();

  // 创建Vue实例
  const app = new Vue({
    router,
    context,
    store,
    render: h => h(App)
  });
  return { app, router, store };
}
