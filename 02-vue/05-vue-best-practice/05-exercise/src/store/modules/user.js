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
    login({ commit }, { username }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin") {
            localStorage.setItem("token", username);
            commit("SET_TOKEN", username);
            resolve();
          } else {
            reject("用户名或密码错误");
          }
        }, 1000);
      });
    },
    getInfo({ state, commit }) {
      const roles = state.token === "admin" ? ["admin"] : ["editor"];
      commit("SET_ROLES", roles);
      return roles;
    }
  }
};
