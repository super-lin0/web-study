function defineReactive(obj, key, val) {
  observe(val);

  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);

      Dep.target && dep.addDep(Dep.target);

      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        console.log("set", key, val);

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

// 根据传入value的类型做响应式处理
class Observe {
  constructor(value) {
    this.value = value;

    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value);
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
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

    observe(this.$data);

    proxyData(this);

    // 编译
    new Compile(options.el, this);
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    const childNodes = el.childNodes;

    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 元素
        console.log("元素", node.name);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        console.log("插值", node.textContent);

        this.compileText(node);
      }

      // 递归
      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
    // node.textContent = this.$vm[RegExp.$1];

    const attrs = node.attributes;

    Array.from(attrs).forEach((attr) => {
      // k-xxx="abc"
      const attrName = attr.name;
      const exp = attr.value;

      if (attrName.startsWith("k-")) {
        const dir = attrName.substring(2);
        this[dir] && this[dir](node, exp);
      }

      // 事件处理
      if (this.isEvent(attrName)) {
        // @click="onClick"
        const dir = attrName.substring(1);
        // 事件监听
        this.eventHandler(node, exp, dir);
      }
    });
  }

  text(node, exp) {
    // node.textContent = this.$vm[exp];
    this.update(node, exp, "text");
  }

  html(node, exp) {
    // node.innerHTML = this.$vm[exp];
    this.update(node, exp, "html");
  }

  update(node, exp, dir) {
    const fn = this[dir + "Updater"];

    fn && fn(node, this.$vm[exp]);

    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  htmlUpdater(node, value) {
    node.innerHTML = value;
  }

  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isEvent(dir) {
    return dir.indexOf("@") === 0;
  }

  // ============冬瓜冬瓜我是西瓜=============
  eventHandler(node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }

  // k-model="xx"
  model(node, exp) {
    this.update(node, exp, "model");

    node.addEventListener("input", (e) => {
      this.$vm[exp] = e.target.value;
    });
  }

  modelUpdater(node, value) {
    // 表单元素赋值
    node.value = value;
  }
  // ============冬瓜冬瓜我是西瓜=============
}

// const watchers = [];
// 监听器：负责依赖更新
class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    // watchers.push(this);

    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
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
