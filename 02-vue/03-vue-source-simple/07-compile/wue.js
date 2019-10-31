class Wue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    this.observe(this.$data);

    // new Watcher(this, "test");
    // this.test;
    new Compiler(options.el, this);

    //执行以下钩子函数
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
        Dep.target && dep.appDepend(Dep.target);
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }

        val = newVal;

        dep.notify();

        console.log(`Wue: set ${key}值更新`);
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

        console.log(`Wue: proxy set ${key}值更新`);
      }
    });
  }
}

class Dep {
  constructor() {
    this.subs = [];
  }

  appDepend(dep) {
    this.subs.push(dep);
  }

  notify() {
    this.subs.forEach(item => item.update());
  }
}

class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm;
    this.key = key;
    this.cb = cb;

    Dep.target = this;
    this.vm[this.key]; // 触发依赖收集，读取value值
    Dep.target = null; // 防止不小心把它多次加到Dep中
  }

  update() {
    // console.log(`Watcher: update: ${this.key}更新`);
    this.cb.call(this.vm, this.vm[this.key]);
  }
}
