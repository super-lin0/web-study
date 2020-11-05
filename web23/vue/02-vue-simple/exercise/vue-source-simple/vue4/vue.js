function defineReactive(obj, key, val) {
  observe(val);
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      Watcher.target && dep.addDep(Watcher.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key, newVal);

        observe(newVal);
        val = newVal;

        // watchers.forEach((w) => w.update());
        dep.notify();
      }
    },
  });
}

function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observe(obj);
}

class Observe {
  constructor(obj) {
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function proxyData(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(newVal) {
        vm.$data[key] = newVal;
      },
    });
  });
}

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 响应式
    observe(this.$data);

    // 代理
    proxyData(this);

    // 编译
    new Compile(options.el, this);
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((w) => w.update());
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    // watchers.push(this);
    Watcher.target = this;
    this.vm[this.key];
    Watcher.target = null;
  }

  update() {
    this.updateFn.call(this.vm, this.vm[this.key]);
  }
}
