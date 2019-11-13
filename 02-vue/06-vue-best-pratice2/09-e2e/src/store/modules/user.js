export default {
  namespaced: true,
  state: {
    token: ""
  },
  mutations: {
    SET_TOKEN(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    login({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (username === "admin") {
            console.log(username, password);

            commit("SET_TOKEN", username);
            resolve();
          } else {
            reject("用户名或密码错误");
          }
        }, 1000);
      });
    }
  }
};
