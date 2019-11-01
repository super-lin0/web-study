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
        // console.log("元素" + node.nodeName);
        this.compileElement(node);
      } else if (this.isInner(node)) {
        // console.log("插值文本" + node.nodeName);

        this.compileText(node);
      }

      // 存在子节点的情况
      this.compile(node);
    });
  }

  isElement(node) {
    return node.nodeType === Node.ELEMENT_NODE;
  }

  isInner(node) {
    return (
      node.nodeType === Node.TEXT_NODE && /\{\{(.*)\}\}/.test(node.textContent)
    );
  }

  /**
   * 编译插值文本节点
   * @param {*} node
   */
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  /**
   *编译元素
   * @param {node} node
   */
  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      // <p w-text="name"></p>
      const name = attr.name; // w-text
      const exp = attr.exp; //  "name"

      if (this.isDerictive(name)) {
        const dir = name.substring(2); // text

        this[dir] && this[dir](node, exp);
      }
    });
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }

  isDerictive(str) {
    return str.indexOf("w-") !== -1;
  }

  update(node, exp, dir) {
    // 首次执行
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
