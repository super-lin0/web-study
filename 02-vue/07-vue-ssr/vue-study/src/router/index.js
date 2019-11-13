import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/Index";
import Detail from "@/views/Detail";

Vue.use(Router);

// 导出工厂函数，他可以返回新的Router实例
// 每个请求一个单独实例避免状态相互污染
export function createRouter() {
  return new Router({
    mode: "history",
    routes: [
      { path: "/", component: Index },
      { path: "/detail", component: Detail }
    ]
  });
}
