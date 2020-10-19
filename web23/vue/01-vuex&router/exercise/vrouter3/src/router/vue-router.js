let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;

    const initial = window.location.hash.slice(1) || "/";

    Vue.util.defineReactive(this, "current", initial);

    window.addEventListener("hashchange", () => {
      this.current = window.location.hash.slice(1) || "/";
      console.log(this.current);
    });
  }
}

VueRouter.install = (_Vue) => {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  Vue.component("router-view", {
    render(h) {
      let component = null;

      const route = this.$router.$options.routes.find(
        (route) => route.path === this.$router.current
      );

      if (route) {
        component = route.component;
      }

      return h(component);
    },
  });
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: `#${this.to}`,
          },
        },
        this.$slots.default
      );
    },
  });
};

export default VueRouter;
