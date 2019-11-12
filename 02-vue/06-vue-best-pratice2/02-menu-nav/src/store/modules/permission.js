import { constRoutes, asyncRoutes } from "../../router";

const hasPermission = (route, roles) => {
  if (route.mata && route.meta.roles) {
    return route.meta.roles.some(role => roles.includes(role));
  }

  return true;
};
const filterRouter = (routes, roles) => {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };

    if (hasPermission(tmp, route)) {
      if (tmp.children) {
        tmp.children = filterRouter(tmp.children, roles);
      }

      res.push(tmp);
    }
  });

  return res;
};
export default {
  namespaced: true,
  state: {
    routes: [], // 完整路由
    addRoutes: [] // 添加路由
  },
  mutations: {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes;
      state.routes = constRoutes.concat(routes);
    }
  },
  actions: {
    generate({ commit }, { roles }) {
      const routes = filterRouter(asyncRoutes, roles);
      commit("SET_ROUTES", routes);

      return routes;
    }
  }
};
