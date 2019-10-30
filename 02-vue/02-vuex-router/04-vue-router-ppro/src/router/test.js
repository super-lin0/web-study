const routers = [
  {
    path: "",
    component: "home"
  },
  {
    component: "",
    path: "/parent",
    children: [
      { path: "", component: "" },
      { path: "foo", component: "" },
      { path: "bar", component: "" },
      { path: "/baz", component: "" },
      {
        path: "qux/:quxId",
        component: "",
        children: [
          { path: "quux", name: "quux", component: "" },
          { path: "quuy", name: "quuy", component: "" }
        ]
      },
      { path: "quy/:quyId", component: "" },
      { name: "zap", path: "zap/:zapId?", component: "" }
    ]
  }
];

const pathMap = {};

const createRouteMap = () => {
  routers.forEach(route => {
    // this.routerMap[route.path] = route;
    addRouteRecord(pathMap, route);
  });
};

const addRouteRecord = (pathMap, route, parent) => {
  const { path } = route;
  const normalizedPath = normalizePath(path, parent);

  if (route.children) {
    route.children.forEach(child => {
      addRouteRecord(pathMap, child, { ...route, path: normalizedPath });
    });
  }

  if (!pathMap[normalizedPath]) {
    pathMap[normalizedPath] = route;
  }
};

const normalizePath = (path, parent) => {
  if (path[0] === "/") return path;
  if (parent == null) return path;
  return `${parent.path}/${path}`.replace(/\/\//g, "/");
};

createRouteMap();

console.log(pathMap);
