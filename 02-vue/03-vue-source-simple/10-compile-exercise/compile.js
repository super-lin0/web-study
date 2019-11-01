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
        console.log(`元素${node.nodeName}`);
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
}
