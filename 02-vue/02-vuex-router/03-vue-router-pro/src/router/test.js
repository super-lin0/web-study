const routers = [
  {
    path: "/",
    name: "home",
    component: "Home",
    children: [
      {
        path: "about",
        name: "about",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue")
      }
    ]
  }
];

const routerMap = {};

const transfer = (routers, prefix = "") => {
  routers.forEach(route => {
    const { children, path, ...props } = route;
    prefix += path;

    routerMap[prefix] = { ...props, path: prefix };

    if (children) {
      transfer(children, prefix);
    }
  });
};

transfer(routers);

console.log(routerMap);
