import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./permission";

import vp from "./directive/permission";

Vue.config.productionTip = false;
Vue.directive("permission", vp);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
