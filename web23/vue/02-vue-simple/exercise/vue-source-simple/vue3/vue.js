function defineReactive(obj, key, val) {
  observe(val);

  // 创建Dep
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      // 依赖收集
      Dep.target && dep.addDep(Dep.target);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        // 保证如果newVal是对象，则再次做响应式处理
        observe(newVal);
        val = newVal;

        dep.notify();
      }
    },
  });
}

// 遍历obj，对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  new Observe(obj);
}

// 根据传入value的类型做响应式处理
class Observe {
  constructor(obj) {
    this.obj = obj;

    if (Array.isArray(obj)) {
      // todo
    } else {
      this.walk(obj);
    }
  }

  // 对象响应式
  walk(obj) {
    // 遍历obj所有key,做响应式处理
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function proxyData(vm) {
  Object.keys(vm.$data).forEach((key) => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key];
      },
      set(v) {
        vm.$data[key] = v;
      },
    });
  });
}

// Vue
// 1、对data选项做响应式处理
// 2、编译模版
class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    // 1、data响应式处理
    observe(this.$data);

    // 2、代理
    proxyData(this);

    // 3、编译
    new Compile(this.$options.el, this);
  }
}

// 解析模版
// 1、处理插值
// 2、处理指令和事件
// 3、以上两者的初始化和更新
class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  compile(el) {
    // 遍历el的子节点，判断他们的类型，做相应的处理即可
    const childNodes = el.childNodes;

    childNodes.forEach((node) => {
      if (node.nodeType === 1) {
        // 元素
        console.log("元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 文本
        // console.log("文本", node.textContent);
        // 文本初始化
        this.compileText(node);
      }

      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  // 编译文本
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  // 编译元素
  compileElement(node) {
    const attrs = node.attributes;

    Array.from(attrs).forEach((attr) => {
      // k-xxx="aaa"
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
    this.update(node, exp, "text");
  }

  html(node, exp) {
    this.update(node, exp, "html");
  }

  // k-model="xx"
  model(node, exp) {
    // update方法只完成赋值和更新
    this.update(node, exp, "model");

    // 事件监听
    node.addEventListener("input", (e) => {
      // 将新值赋给数据即可
      this.$vm[exp] = e.target.value;
    });
  }

  update(node, exp, dir) {
    // 初始化
    const fn = this[dir + "Updater"];

    fn && fn(node, this.$vm[exp]);

    // 更新
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

  modelUpdater(node, value) {
    // 表单元素赋值
    node.value = value;
  }

  // 是否是插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isEvent(dir) {
    return dir.indexOf("@") === 0;
  }

  eventHandler(node, exp, dir) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }
}

// 监听器；负责依赖更新

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm;
    this.key = key;
    this.updateFn = updateFn;

    // 触发依赖收集
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null;
  }

  // 未来被Dep实例调用
  update() {
    // 执行实际更新操作
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
