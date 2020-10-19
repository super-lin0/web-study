// Compiler:遍历模版，分析其中哪些地方用到了data中的key以及事件等指令
// 这时认为是一个依赖，创建一个Watcher实例，使界面中的dom更新函数和那个key
// 挂钩，如果更新了key，则执行这个更新函数
class Compiler {
  // el:宿主元素
  // vm:KVue实例
  constructor(el, vm) {
    this.$vm = vm;
    this.$el = document.querySelector(el);

    // 执行编译
    this.compile(this.$el);

    // 追加
    // this.$el.appendChild(this.$el);
  }

  compile(el) {
    const childNodes = el.childNodes;

    Array.from(childNodes).forEach((node) => {
      // 判断节点类型
      if (this.isElement(node)) {
        // 元素 <div>
        console.log("编译元素", node.nodeName);
        this.compileElement(node);
      } else if (this.isInter(node)) {
        // 插值文本 {{xx}}
        console.log("编译插值文本", node.textContent);
        this.compileText(node);
      }

      // 递归可能存在的子元素
      this.compile(node);
    });
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  // {{xxx}} 是否是插值表达式：是否是文本节点并且符合正则
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent);
  }

  // 编译插值文本
  compileText(node) {
    // node.textContent = this.$vm[RegExp.$1];
    this.update(node, RegExp.$1, "text");
  }

  compileElement(node) {
    // 获取属性
    const nodeAttr = node.attributes;

    Array.from(nodeAttr).forEach((attr) => {
      // k-text={{xxx}}
      const attrName = attr.name;
      const exp = attr.value;

      if (this.isDirective(attrName)) {
        // 截取指令名字
        const dir = attrName.substring(2); // text
        // 执行相应的更新函数
        this[dir] && this[dir](node, exp);
      }
    });
  }

  text(node, exp) {
    // node.textContent = exp;
    this.update(node, exp, "text");
  }

  isDirective(attr) {
    return attr.indexOf("k-") === 0;
  }

  // 更新函数：负责更新dom，同时创建Watcher实例在两者之间挂钩
  update(node, exp, dir) {
    // 首次初始化
    const updaterFn = this[dir + "Updater"];
    updaterFn && updaterFn(node, this.$vm[exp]);

    // 更新
    new Watcher(this.$vm, exp, (value) => {
      updaterFn && updaterFn(node, value);
    });
  }

  textUpdater(node, value) {
    node.textContent = value;
  }
}
