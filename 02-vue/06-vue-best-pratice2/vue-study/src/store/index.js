import Vue from "vue";
import Vuex from "vuex";
// import Vuex from "./kvuex";
import count from './modules/count'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    count,user,permission
  },
  getters: {
    roles: state => state.user.roles
  }
});
