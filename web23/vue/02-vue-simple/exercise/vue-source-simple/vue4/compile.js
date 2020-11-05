class Compile {
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    if (this.$el) {
      this.compile(this.$el);
    }
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  isDirective(attrName) {
    return attrName.startsWith("v-");
  }

  isEvent(attrName) {
    return attrName.startsWith("@");
  }

  compile(el) {
    // 遍历el的子节点，判断他们的类型
    const childNodes = el.childNodes;

    childNodes.forEach((node) => {
      if (this.isElement(node)) {
        // 元素
        console.log("元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        console.log("文本", node.textContent);
        this.compileText(node);
      }

      if (node.childNodes) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      // v-text="counter"
      const attrName = attr.name;
      const exp = attr.value;

      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);

        this[dir] && this[dir](node, exp);
      }

      if (this.isEvent(attrName)) {
        const dir = attrName.substring(1);
        this.handleEvent(node, dir, exp);
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
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  // v-model="doubleCounter"
  model(node, exp) {
    this.update(node, exp, "model");

    node.addEventListener("input", (e) => {
      this.$vm[exp] = e.target.value;
    });
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

  modelUpdater(node, value) {
    node.value = value;
  }

  handleEvent(node, dir, exp) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }
}
