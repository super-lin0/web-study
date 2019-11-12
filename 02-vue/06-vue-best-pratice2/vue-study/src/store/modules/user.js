import {login, getInfo} from '@/api/user';

const state = {
  token: localStorage.getItem("token"),
  // 其他用户信息
  roles: []
};

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
};

const actions = {
  // 模拟用户登录
  login({ commit }, userInfo) {
    // 调用并处理结果，错误处理已拦截无需处理
    return login(userInfo).then((res) => {
      commit("SET_TOKEN", res.data);
      localStorage.setItem("token", res.data);
    });
    // const { username } = userInfo;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (username === "admin" || username === "jerry") {
    //       commit("SET_TOKEN", username);
    //       localStorage.setItem("token", username);
    //       resolve();
    //     } else {
    //       reject("用户名、密码错误");
    //     }
    //   }, 1000);
    // });
  },
  getInfo({commit, state}) {
    return getInfo(state.token).then(({data: roles}) => {
      commit("SET_ROLES", roles);
      return roles
    })
    // return new Promise((resolve) => {
    //     setTimeout(() => {
    //         const roles = state.token === 'admin' ? ['admin'] : ['editor']
    //         commit('SET_ROLES', roles)
    //         resolve(roles)
    //     }, 1000);
    // })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
