import { constRoutes, asyncRoutes } from "@/router";

const state = {
  routes: [], // 完整路由
  addRoutes: [] // 权限路由
};

const mutations = {
  // routes是用户可访问的权限路由
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes);
  }
};

const actions = {
  generateRoutes({ commit }, roles) {
    // 过滤出能访问的路由表
    const routes = filterAsyncRoutes(asyncRoutes, roles);
    commit("SET_ROUTES", routes);
    return routes;
  }
};

function filterAsyncRoutes(routes, roles) {
  const res = [];
  routes.forEach(route => {
    const tmp = { ...route };

    if (hasPermision(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }

      res.push(tmp);
    }
  });
  return res;
}

function hasPermision(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    // 路由定义中没有roles选项,则不需要权限访问
    return true;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
