class Wue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    this.observe(this.$data);

    new Compile(options.el, this);
    // new Watcher(this, "test");
    // this.test;

    if (options.created) {
      options.created.call(this);
    }
  }

  observe(data) {
    if (!data || typeof data !== "object") {
      return;
    }

    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    this.observe(val);
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        dep.notify();
      }
    });
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  addDep(dep) {
    this.subs.push(dep);
  }

  notify() {
    this.subs.forEach(dep => dep.update());
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.vm[this.key]; // 触发依赖
    Dep.target = null;
  }

  update() {
    // console.log(`Watcher: ${this.key}`);
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
