import Vue from "vue";
import VueRouter from "../w-router";
// import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: "<div>home</div>"
  },
  {
    component: "<div>parent</div>",
    path: "/parent",
    children: [
      { path: "", component: "" },
      { path: "foo", component: "<div>foo</div>" },
      { path: "bar", component: "<div>bar</div>" },
      { path: "/baz", component: "<div>baz</div>" },
      {
        path: "qux/:quxId",
        component: "<div>qux:quxId</div>",
        children: [
          {
            path: "quux",
            name: "quux",
            component: "<div>quux</div>"
          },
          {
            path: "quuy",
            name: "quuy",
            component: "<div>quuy</div>"
          }
        ]
      },
      { path: "quy/:quyId", component: "<div>quy:quyId</div>" },
      {
        name: "zap",
        path: "zap/:zapId?",
        component: "<div>zap</div>"
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
