/**
 * Compiler: 遍历模版，分析其中哪些地方用到了data中的key以及事件指令
 * 这时认为是一个依赖，创建一个Watcher实例，使界面中的dom更新函数和那个key
 * 挂钩，如果更新了key， 则执行这个更新函数
 */

class Compiler {
  // el: 宿主元素选择器
  // vm: Wue的实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 执行编译
    this.compile(this.$el);

    // 追加
    // this.$el.appendChild()
  }

  compile(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach(node => {
      //判断节点类型
      if (this.isElement(node)) {
        // 元素
        // console.log("编译元素：" + node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 插值文本{{xx}}
        // console.log("编译插值的文本：" + node.textContent);
        this.compileText(node);
      }
      //递归可能存在的子元素
      this.compile(node);
    });
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInter(node) {
    //是否是插值表达式，判断依据：文本节点，
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  /**
   * 编译插值文本
   * @param {*} node
   */
  compileText(node) {
    // {{xx}}
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  /**
   * 编译元素
   * @param {*} node
   */
  compileElement(node) {
    // 获取属性
    const nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      // k-text="exp"
      const attrName = attr.name; // k-text
      const exp = attr.value; // exp

      if (this.isDirective(attrName)) {
        // 截取指令名称
        const dir = attrName.substring(2); // text
        // 执行相应的更新函数
        this[dir] && this[dir](node, exp);
      }
    });
  }

  text(node, exp) {
    this.update(node, exp, "text");
  }

  /**
   * 判断是否是指令
   * @param {*} attr
   */
  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }

  /**
   * update 函数，负责更新dom，同时创建Watcher实例，在两者之间挂钩
   */
  update(node, exp, dir) {
    // 首次初始化
    const updateFn = this[dir + "Updater"];
    updateFn && updateFn(node, this.$vm[exp]);

    //更新操作
    new Watcher(this.$vm, exp, value => {
      updateFn && updateFn(node, value);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }
}
