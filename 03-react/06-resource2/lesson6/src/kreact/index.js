import { diff } from "./diff";

function createElement(type, props, ...children) {
  //构建成树状图
  props.children = children;
  let vtype;
  if (typeof type === "string") {
    //原生标签
    vtype = 1;
  } else if (typeof type === "function") {
    //class： 2 或者function组件 3
    vtype = type.isReactComponent ? 2 : 3;
  }
  //返回一个vnode
  return {
    type,
    vtype,
    props
  };
}

class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
    this.$cache = {}; //可以存储父节点
    this.state = {};
  }
  setState = (nextState, callback) => {
    //真实的setState是一个批量处理，我们也称为异步
    //暂时写一个假的
    this.state = {
      ...this.state,
      ...nextState
    };
    this.forceUpdate();
  };
  forceUpdate = () => {
    // vnode ->node ->container
    const { $cache: cache } = this;
    const newVnode = this.render();
    const newNode = diff(cache, newVnode); //newVnode->node，最终更新到container
    //每次更新vnode、node
    this.$cache = {
      ...cache,
      vnode: newVnode,
      node: newNode
    };
  };
}

const React = { createElement, Component };

export default React;
