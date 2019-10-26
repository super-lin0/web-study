import Vue from "vue";
import App from "./App.vue";
import Bus from "./utils/bus";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Bus();

new Vue({
  render: h => h(App)
}).$mount("#app");
