import Vue from "vue";
import Vuex from "./vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    add(state) {
      return {
        ...state,
        count: state.count++,
      };
    },
  },
  actions: {
    add({ commit }) {
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  modules: {},
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
  },
});
