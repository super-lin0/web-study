let Vue;

class Store {
  constructor(options) {
    this.state = new Vue({
      data: options.state
    });

    this.mutations = options.mutations || {};
    this.actions = options.actions || {};

    this.commit = this.commit.bind(this);
    this.dispatch = this.dispatch.bind(this);
  }

  commit(type, args) {
    this.mutations[type](this.state, args);
  }

  dispatch(type, arg) {
    this.actions[type](this, arg);
  }
}

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

export default { Store, install };
