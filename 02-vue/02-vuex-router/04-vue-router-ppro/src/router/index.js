import Vue from "vue";
import VueRouter from "../w-router";
// import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: "home"
  },
  {
    component: "parent",
    path: "/parent",
    children: [
      { path: "", component: "" },
      { path: "foo", component: "foo" },
      { path: "bar", component: "bar" },
      { path: "/baz", component: "baz" },
      {
        path: "qux/:quxId",
        component: "qux:quxId",
        children: [
          {
            path: "quux",
            name: "quux",
            component: "quux"
          },
          {
            path: "quuy",
            name: "quuy",
            component: "quuy"
          }
        ]
      },
      { path: "quy/:quyId", component: "quy:quyId" },
      {
        name: "zap",
        path: "zap/:zapId?",
        component: "zap"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
