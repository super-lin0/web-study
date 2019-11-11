import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user.js";
import permission from "./modules/permission.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, permission }
});
