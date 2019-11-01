class Compile {
  constructor(vm, el) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    this.compile(this.$el);
  }

  compile(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // console.log(`元素${node.nodeName}`);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        this.compileText(node);
      }
      this.compile(node);
    });
  }

  isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isInter(node) {
    return (
      node.nodeType === Node.TEXT_NODE && /\{\{(.*)\}\}/.test(node.textContent)
    );
  }

  /**
   * 编译文本节点
   * @param {*} node
   */
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  /**
   * 编译元素
   * @param {*} node
   */
  compileElement(node) {
    const attrs = node.attributes;

    Array.from(attrs).forEach(attr => {
      const name = attr.name;
      const exp = attr.value;

      if (this.isDirective(name)) {
        // w-text="msg"
        const dir = name.substring(2);

        this[dir] && this[dir](node, exp);
      } else if (this.isEvent(name)) {
        const dir = name.substring(1);
        this.eventHandler(node, exp, dir, this.$vm);
      }
    });
  }

  eventHandler(node, exp, dir, vm) {
    const fn = vm.$methods[exp];
    if (fn && dir) {
      node.addEventListener(dir, fn.bind(vm));
    }
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }

  html(node, exp) {
    node.innerHTML = this.$vm[exp];
  }

  model(node, exp) {
    this.modelUpdate(node, this.$vm[exp]);

    new Watcher(this.$vm, exp, value => {
      this.modelUpdate(node, value);
    });

    node.addEventListener("input", e => {
      this.$vm[exp] = e.target.value;
    });
  }

  isDirective = str => str.startsWith("w-");

  isEvent = str => str.startsWith("@");

  update(node, exp, dir) {
    const updateFn = this[dir + "Update"];
    updateFn && updateFn(node, this.$vm[exp]);

    new Watcher(this.$vm, exp, value => {
      updateFn && updateFn(node, value);
    });
  }

  textUpdate(node, value) {
    node.textContent = value;
  }

  modelUpdate(node, value) {
    node.value = value;
  }
}
