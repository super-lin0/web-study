/**
 * Compile：遍历模版，分析其中哪些地方用到了data中的key以及事件指令
 * 这时认为是一个依赖，创建一个Watcher实例，使界面中的dom更新函数和那个key挂钩
 * 如果更新了key,则执行这个更新函数
 */

class Compile {
  /**
   *
   * @param {*} el  宿主元素选择器 #app
   * @param {*} vm  Wue实例
   */
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    //执行编译
    this.compile(this.$el);
  }

  compile(el) {
    const childNode = el.childNodes;

    Array.from(childNode).forEach(node => {
      if (this.isElement(node)) {
        // 元素
        // console.log(`编译元素${node.nodeName}`);
        this.compileElement(node);
      } else if (this.isInner(node)) {
        // 插值元素
        // console.log(`编译插值的文本：$node.textContent`);
        this.compileText(node);
      }

      // 递归可能存在的子元素
      this.compile(node);
    });
  }

  /**
   * 编译元素
   * @param {*} node
   */
  compileElement(node) {
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // w-text="name"
      console.log(attr);
      const attrName = attr.name; // w-text
      const exp = attr.value; // "name"

      if (this.isDirective(attrName)) {
        // 截取指令名称
        const dir = attrName.substring(2); // text

        // 执行相应更新函数: text()
        this[dir] && this[dir](node, exp);
      }
    });
  }

  /**
   * 判断是否是指令
   * @param {*} attr
   */
  isDirective(attr) {
    return attr.indexOf("w-") !== -1;
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInner(node) {
    // 是否是插值表达式，判断依据：文本节点以及{{}}
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  /**
   * 编译文本节点
   * @param {*} node
   */
  compileText(node) {
    this.update(node, RegExp.$1, "text");
  }

  /**
   *
   * @param {*} node 节点信息
   * @param {*} exp 内容
   * @param {*} dir
   */
  update(node, exp, dir) {
    // 初始化
    const updateFn = this[`${dir}Updater`];
    updateFn && updateFn(node, this.$vm[exp]);

    // 更新操作
    new Watcher(this.$vm, exp, value => {
      updateFn && updateFn(node, value);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }
}
