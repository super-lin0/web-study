import Vue from "vue";
import VueRouter from "../w-router.js";
// import VueRouter from "vue-router";
import Home from "../views/Home.vue";

// 1、应用插件
Vue.use(VueRouter); // 执行插件的install上

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

// 创建router实例
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;