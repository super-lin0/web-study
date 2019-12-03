import diff from "./diff";

function createElement(type, props, ...children) {
  props.children = children;
  console.log("createElement:", arguments);

  let vtype = null;

  if (typeof type === "string") {
    // 原生标签
    vtype = 1;
  } else if (typeof type === "function") {
    // class或者函数组件
    vtype = type.isReactComponent ? 2 : 3;
  }

  return { vtype, type, props };
}

class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
    this.$cache = {}; // 存储父节点
    this.state = {};
  }

  setState(nextState, callback) {
    // 真实setState是一个批量处理，也称为异步
    // 暂时写一个假的
    this.state = {
      ...this.state,
      ...nextState
    };
    this.forceUpdate();
  }

  forceUpdate() {
    // vnode -> node -> container
    const newVnode = this.render();
    const { $cache: cache } = this;

    const newNode = diff(cache, newVnode); // newVnode -> node,最终更新到container中去

    // 每次更新vnode，node
    this.$cache = {
      ...cache,
      vnode: newVnode,
      node: newNode
    };
  }
}

const React = { createElement, Component };

export default React;
