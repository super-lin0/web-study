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

  isDirective(directive) {
    return directive.startsWith("v-");
  }

  isEvent(event) {
    return event.startsWith("@");
  }

  compile(node) {
    const childNodes = node.childNodes;

    Array.from(childNodes).forEach((node) => {
      if (this.isElement(node)) {
        // 元素
        console.log("元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        console.log("插值", node.textContent);
        this.compileText(node);
      }

      if (node.childNodes && node.childNodes.length > 0) {
        this.compile(node);
      }
    });
  }

  compileElement(node) {
    const attrs = node.attributes;
    Array.from(attrs).forEach((attr) => {
      const attrName = attr.name;
      const exp = attr.value;

      // v-text="counter"
      if (this.isDirective(attrName)) {
        const dir = attrName.substring(2);

        this[dir] && this[dir](node, exp);
      }

      // @click="onClick"
      if (this.isEvent(attrName)) {
        const dir = attrName.substring(1);

        this.eventHandle(node, dir, exp);
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

  model(node, exp) {
    this.update(node, exp, "model");

    node.addEventListener("input", (e) => {
      this.$vm[exp] = e.target.value;
    });
  }

  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  update(node, exp, dir) {
    const fn = this[`${dir}Updater`];

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

  eventHandle(node, dir, exp) {
    const fn = this.$vm.$options.methods && this.$vm.$options.methods[exp];
    node.addEventListener(dir, fn.bind(this.$vm));
  }
}
