import { login, getInfo } from "@/api/users";

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token"),
    roles: []
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    },
    SET_ROLES(state, payload) {
      state.roles = payload;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      // 调用并处理结果，错误处理已拦截无需处理
      return login(userInfo).then(res => {
        commit("SET_TOKEN", res.data);
        localStorage.setItem("token", res.data);
      });
      // return new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     if (username === "admin" || username === "tom") {
      //       commit("SET_TOKEN", username);
      //       localStorage.setItem("token", username);
      //       resolve();
      //     } else {
      //       reject("用户名或密码错误");
      //     }
      //   }, 1000);
      // });
    },
    getInfo({ commit, state }) {
      // const roles = state.token === "admin" ? ["admin"] : ["editor"];

      // commit("SET_ROLES", roles);

      // return roles;

      return getInfo(state.token).then(({ data: roles }) => {
        commit("SET_ROLES", roles);
        return { roles };
      });
    }
  }
};
