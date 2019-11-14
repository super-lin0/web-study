import Vue from "vue";
import VueRouter from "vue-router";

import Index from "@/views/Index.vue";
import Detail from "@/views/Detail.vue";

Vue.use(VueRouter);

// 导出工厂函数，它可以返回新的Router实例
// 每个请求一个单独的实例，避免状态相互污染
export function createRouter() {
  return new VueRouter({
    mode: "history",
    routes: [
      { path: "/", component: Index },
      { path: "/detail", component: Detail }
    ]
  });
}
