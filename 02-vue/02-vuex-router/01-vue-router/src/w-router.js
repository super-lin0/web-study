let Vue;
class MyRouter {
  constructor(options) {
    this.$options = options;

    this.routeMap = {};

    /**
     * Vue可以使data里面的所有数据响应式
     */
    this.app = new Vue({
      data: { current: "/" }
    });
  }

  init() {
    this.bindEvents();
    this.createRouteMap();
    this.initComponent();
  }

  bindEvents() {
    window.addEventListener("hashchange", this.onHashChange.bind(this));
  }

  onHashChange() {
    console.log(window.location.hash);
    this.app.current = window.location.hash.slice(1) || "/";
  }

  createRouteMap() {
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });
  }

  initComponent() {
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        return h(
          "a",
          {
            attrs: { href: "#" + this.to }
          },
          [this.$slots.default]
        );
      }
    });

    /**
     * 只要render函数里面用到了某个响应式数据，如果该响应式数据发生变化，render就会重新执行
     */
    /**
     * 函数式组件方式
     */
    Vue.component("router-view", {
      functional: true,
      render(_, { parent }) {
        const h = parent.$createElement;
        const router = parent.$router;

        const Component = router.routeMap[router.app.current].component;
        return h(Component);
      }
    });
  }
}

MyRouter.install = _Vue => {
  // 确保 install被调用一次
  if (_Vue === Vue) return;

  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

export default MyRouter;
