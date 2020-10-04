let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    let initial = window.location.hash.slice(1) || "/";

    Vue.util.defineReactive(this, "current", initial);

    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1);
      console.log("hashchange", this.current);
    });
  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;

  // 1、this.$router.push
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 实现两个组件router-view,router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h("a", { attrs: { href: `#${this.to}` } }, this.$slots.default);
    },
  });
  Vue.component("router-view", {
    render(h) {
      let component = null;
      const path = this.$router.current;
      const route = this.$router.$options.routes.find(
        (route) => route.path === path
      );
      console.log("install", path, route);

      if (route) {
        component = route.component;
      }
      return h(component);
    },
  });
};

export default VueRouter;
