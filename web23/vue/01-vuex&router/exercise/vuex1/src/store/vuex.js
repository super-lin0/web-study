let Vue;

class Store {
  constructor(options) {
    this.$options = options;
    this.getters = {};
    this._vm = new Vue({
      data: {
        $$state: options.state,
      },
    });
    this._mutations = options.mutations;
    this._actions = options.actions;

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);

    options.getters && this.handleGetters(options.getters);
  }

  handleGetters(getters) {
    Object.keys(getters).map((key) => {
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
      console.error("unknow mutation type ");
    }

    entry(this.state, payload);
  }

  dispatch(type, payload) {
    const entry = this._actions[type];

    if (!entry) {
      console.error("unknow action type ");
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
