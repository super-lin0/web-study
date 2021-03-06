let Vue;

class WRouter {
  constructor(options) {
    this.$options = options;
    this.routerMap = {};

    this.app = new Vue({
      data: {
        current: "/"
      }
    });
  }

  init() {
    this.bindEvents();
    this.createRouteMap();
    this.createComponent();
  }

  bindEvents() {
    window.addEventListener("hashchange", this.onHashChange.bind(this));
    window.addEventListener("load", this.onHashChange.bind(this));
  }

  onHashChange() {
    this.app.current = window.location.hash.slice(1) || "/";
  }

  createRouteMap() {
    this.$options.routes.forEach(route => {
      // this.routerMap[route.path] = route;
      this.addRouteRecord(this.routerMap, route);
    });
  }

  // vue-router中嵌套路由的实现-精简版
  addRouteRecord(pathMap, route, parent) {
    const { path } = route;
    const normalizedPath = this.normalizePath(path, parent);

    if (route.children) {
      route.children.forEach(child => {
        this.addRouteRecord(pathMap, child, { ...route, path: normalizedPath });
      });
    }

    if (!pathMap[normalizedPath]) {
      pathMap[normalizedPath] = route;
    }
  }

  normalizePath = (path, parent) => {
    if (path[0] === "/") return path;
    if (parent == null) return path;
    return `${parent.path}/${path}`.replace(/\/\//g, "/");
  };

  createComponent() {
    // <a href="#/">xxx</a>
    Vue.component("router-link", {
      props: {
        to: {
          type: String
        }
      },
      render(h) {
        return h(
          "a",
          {
            attrs: { href: `#${this.to}` }
          },
          [this.$slots.default]
        );
      }
    });
    Vue.component("router-view", {
      functional: true,
      render(
        h,
        {
          parent: { $router: router }
        }
      ) {
        const Component = router.routerMap[router.app.current].component;

        return h("h1", Component);
      }
    });
  }
}

WRouter.install = function(_Vue) {
  if (Vue === _Vue) {
    return;
  }
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

export default WRouter;
