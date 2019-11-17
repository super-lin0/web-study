export const state = () => ({
  token: ""
});

export const mutations = {
  INIT(state, token) {
    state.token = token;
  }
};

export const getters = {
  isLogin(state) {
    return !!state.token;
  }
};

export const actions = {
  login({ commit, getters }, user) {
    return this.$login(user).then(({ token }) => {
      if (token) {
        commit("INIT", token);
      }
      return getters.isLogin;
    });
  }
};
