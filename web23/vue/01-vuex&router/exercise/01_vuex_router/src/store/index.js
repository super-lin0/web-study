import Vue from "vue";
import Vuex from "./vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    counter: 0,
  },
  mutations: {
    add(state) {
      // state从哪里来
      state.counter++;
    },
  },
  actions: {
    add({ commit }) {
      // 参数是怎么来的
      setTimeout(() => {
        commit("add");
      }, 1000);
    },
  },
  modules: {},
  getters: {
    doubleCounter(state) {
      return state.counter * 2;
    },
  },
});
