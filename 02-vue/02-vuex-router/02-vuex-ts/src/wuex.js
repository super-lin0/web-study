let Vue;

class Store {
  constructor(options) {
    this.$options = options;

    this.state = new Vue({
      data: options.state
    });

    this.mutations = options.mutations;
    this.actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  // 实现commit,可以修改state中的数据
  commit(type, args) {
    this.mutations[type](this.state, args);
  }

  dispatch(type, args) {
    const store = this;
    return this.actions[type](store, args);
  }
}

// 声明插件的install方法
function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

// 导出Wuex
export default { Store, install };
