// 1、插件：挂载$store
// 2、实现Store

let Vue;

class Store {
  constructor(options) {
    // data响应式处理
    // Vue会把data里面的数据递归一下，全部变成响应式数据
    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
      // data: options.state,
    });

    this._mutations = options.mutations;
    this._actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    this.getters = {};

    // -----------天王盖地虎----------------
    // 1、遍历所有的getters放置到this.getters
    // 2、将所有值变为响应式
    options.getters && this.handleGetters(options.getters);
  }

  handleGetters(getters) {
    Object.keys(getters).forEach((key) => {
      const getter = getters[key];

      Object.defineProperty(this.getters, key, {
        get: () => {
          return getter(this.state);
        },
      });
    });
  }

  get state() {
    return this._vm._data.$$state;
  }

  set state(v) {
    console.error("please use replaceState to reset state");
  }

  commit(type, payload) {
    const entry = this._mutations[type];
    if (!entry) {
      console.error("unknow mutations type");
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

// Vue.use
// install.apply(this, [this,...])
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

export default {
  Store,
  install,
};
