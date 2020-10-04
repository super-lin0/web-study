// 1、挂载$store
// 2、实现Store

let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;
    this._actions = options.actions;

    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
    });
    this.getters = {};

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    // -----------天王盖地虎----------------
    // getters
    // 遍历所有的getters并将方法名作为key值放到this.getters里面
    // 将this.getters值变为响应式
    options.getters && this.handleGetters(options.getters);
  }

  handleGetters(getters) {
    Object.keys(getters).forEach((key) => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](this.state),
      });
    });
  }

  get state() {
    return this._vm.$data.$$state;
  }

  set state(value) {
    console.error("please use replaceState to reset state");
  }

  commit(type, payload) {
    const entry = this._mutations[type];

    if (!entry) {
      console.error("unknow action type");
    }

    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];

    if (!entry) {
      console.error("unknow action type");
    }

    entry(this, payload);
  }
}

const install = (_Vue) => {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
};

export default { Store, install };
