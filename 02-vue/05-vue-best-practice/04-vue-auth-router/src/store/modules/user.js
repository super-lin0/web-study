export default {
  namespaced: true,
  state: {
    token: localStorage.getItem("token"),
    roles: []
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
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
    getInfo({ commit, state }) {
      return new Promise(resolve => {
        const roles = state.username === "admin" ? ["admin"] : ["editor"];
        commit("SET_ROLES", roles);
        resolve(roles);
      });
    }
  }
};
