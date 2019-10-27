import Vue from "vue";
import App from "./App.vue";
import Bus from "./utils/bus";
import create from "./utils/create";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Bus();
Vue.prototype.$create = create;

new Vue({
  render: h => h(App)
}).$mount("#app");
