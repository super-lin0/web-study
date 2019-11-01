class Wue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.el = options.el;

    this.observe(this.$data);

    // new Watcher(this, "test");
    // this.test;
    new Compile(this, this.el);

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

        console.log(`weu: set: ${key}更新`);

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
        console.log(`wue: proxy: ${key}更新`);
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
    this.vm[this.key]; // 触发依赖收集
    Dep.target = null;
  }

  update() {
    // console.log(`Watcher: update: ${this.key}`);
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
