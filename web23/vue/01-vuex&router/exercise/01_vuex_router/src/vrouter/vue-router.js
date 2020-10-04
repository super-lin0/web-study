// 1、实现一个插件
// 2、两个组件

// vue插件：
// function
// 对象
// 要求必须要有一个install方法，将来会被Vue.use调用
// 保存Vue构造函数，插件中要使用（不导入还能使用）
let Vue;
class VueRouter {
  constructor(options) {
    this.$options = options;
    // 把current变为响应式数据，
    // 将来数据发生变化，router-view的render函数能够再次执行
    let initial = window.location.hash.slice("#") || "/";

    Vue.util.defineReactive(this, "current", initial);

    // 监控hash变化
    window.addEventListener("hashchange", this.onhashchange.bind(this));
    window.addEventListener("load", this.onhashchange.bind(this));
  }

  onhashchange() {
    this.current = window.location.hash.slice(1) || "/";
  }
}

// 参数一是Vue.use调用时传入的
VueRouter.install = _Vue => {
  Vue = _Vue;

  // 1、挂载$router属性
  // this.$router.push()
  // 全局混入(目的：延迟下面逻辑到router创建完毕并且附加到选项上时才执行)
  Vue.mixin({
    beforeCreate() {
      // 此钩子在每个组件创建实例时都会调用
      // 根实例才有该选项
      if (this.$options.router) {
        Vue.prototype.$router = this.$options.router;
      }
    }
  });

  // 注册并且实现两个组件:router-view,router-link
  Vue.component("router-link", {
    props: {
      to: {
        type: String,
        required: true
      }
    },
    render(h) {
      return h(
        "a",
        {
          attrs: {
            href: `#${this.to}`
          }
        },
        this.$slots.default
      );
    }
  });

  Vue.component("router-view", {
    render(h) {
      let component = null;
      // 获取当前路由所对应的组件
      const current = this.$router.current;
      const route = this.$router.$options.routes.find(
        route => route.path === current
      );

      if (route) {
        component = route.component;
      }

      return h(component);
    }
  });
};

export default VueRouter;
