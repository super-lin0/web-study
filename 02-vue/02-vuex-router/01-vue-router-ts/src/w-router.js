// 声明插件，vue插件需要实现install方法

// 保存Vue构造函数的引用
let Vue;
class WRouter {
  constructor(options) {
    this.$options = options;
    this.routeMap = {}; // {"/index": {component: index, path: ...}}

    // 当前url需要是响应式的
    this.app = new Vue({ data: { current: "/" } });
  }
  init() {
    // 监听事件
    this.bindEvents();
    // 解析routes
    this.createRouteMap();
    // 声明组件
    this.initComponent();
  }

  bindEvents() {
    window.addEventListener("hashchange", this.onhashchange.bind(this));
  }

  onhashchange() {
    this.app.current = window.location.hash.slice(1) || "/";
  }

  createRouteMap() {
    this.$options.routes.forEach(route => {
      this.routeMap[route.path] = route;
    });
  }

  initComponent() {
    // 转换目标<a href="/">xxx</a>
    // <router-link to="/">
    Vue.component("router-link", {
      props: {
        to: String
      },
      render(h) {
        // h(tag, data, children)
        return h(
          "a",
          {
            attrs: { href: `#${this.to}` }
          },
          [this.$slots.default]
        );
      }
    });

    Vue.component("router-vie", {
      render: h => {
        const Component = this.routeMap[this.app.current].component;
        return h(Component);
      }
    });
  }
}

WRouter.install = function(_Vue) {
  Vue = _Vue;

  // 实现一个混入操作
  Vue.mixin({
    beforeCreate() {
      // 获取到WRouter的实例，并且挂载到Vue.prototype上
      // 在根组件beforeCreate时只执行一次
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  });
};

export default WRouter;
