let Vue;

class Store {
  constructor(options) {
    this.state = new Vue({ data: options.state });

    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type, args) {
    this.mutations[type](this.state, args);
  }

  dispatch(type, args) {
    this.actions[type](this, args);
  }
}

function install(_Vue) {
  if (Vue === _Vue) {
    return;
  }
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    }
  });
}

export default { Store, install };
