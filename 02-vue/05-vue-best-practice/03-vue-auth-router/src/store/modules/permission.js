import { asyncRoutes, constRoutes } from "@/router";

// 导入asyncRoutes，检查它是否有权限

const state = {
  routes: [], // 完整路由
  addRoutes: [] // 添加路由
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constRoutes.concat(routes);
  }
};
const actions = {
  // 模拟用户登录
  generateRoutes({ commit }, roles) {
    const routes = filterAsyncRoutes(asyncRoutes, roles);

    commit("SET_ROUTES", routes);

    return routes;
  }
};

const filterAsyncRoutes = (routes, roles) => {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };

    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }

      res.push(tmp);
    }
  });

  return res;
};

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.some(role => roles.includes(role));
  }

  // 若没有定义roles，则不需要权限即可访问
  return true;
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
