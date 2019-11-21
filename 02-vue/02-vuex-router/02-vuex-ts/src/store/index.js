import Vue from "vue";
import Vuex from "../wuex";
// import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    }
  },
  actions: {
    decrementAsync({ commit }) {
      setTimeout(() => {
        commit("decrement");
      }, 1000);
    }
  },
  modules: {}
});
