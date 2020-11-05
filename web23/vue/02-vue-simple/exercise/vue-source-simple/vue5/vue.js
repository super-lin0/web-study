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
        val = newVal;
        observe(newVal);
        console.log("set", key);

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

class Observe {
  constructor(obj) {
    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 数据响应式
    observe(this.$data);

    // 代理
    proxyData(this);

    // 编译
    new Compile(options.el, this);
  }
}

// const watchers = [];
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

class Dep {
  constructor() {
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep);
  }

  notify() {
    this.deps.forEach((dep) => dep.update());
  }
}

console.log(/\{\{(.*)\}\}/.test("{{counter}}"));
console.log(RegExp.$1);
