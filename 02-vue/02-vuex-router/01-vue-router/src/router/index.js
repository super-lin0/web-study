import Vue from "vue";
import VueRouter from "../w-router";
import Home from "../views/Home.vue";

/**
 * 安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
 * 该方法需要在调用 new Vue() 之前被调用。
 * 当 install 方法被同一个插件多次调用，插件将只会被安装一次。
 */
Vue.use(VueRouter);

/**
 *  2. 定义路由
 每个路由应该映射一个组件。 其中"component" 可以是
 通过 Vue.extend() 创建的组件构造器，
 或者，只是一个组件配置对象。
 */
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

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
});

export default router;
