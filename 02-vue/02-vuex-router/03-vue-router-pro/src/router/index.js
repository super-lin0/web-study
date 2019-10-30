import Vue from "vue";
import VueRouter from "../wrouter";
// import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Setting from "../views/Setting.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: Home,
    children: [
      {
        path: "/about",
        name: "about",
        component: () => import("../views/About.vue"),
        children: [{ path: "/setting", name: "setting", component: Setting }]
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
