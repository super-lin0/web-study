export const state = () => ({
  token: ""
});

export const mutations = {
  init(state, token) {
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
    // this.$axios由@nuxtjs/axios提供
    return this.$login(user).then(({ token }) => {
      if (token) {
        commit("init", token);
      }
      return getters.isLogin;
    });
  }
};
