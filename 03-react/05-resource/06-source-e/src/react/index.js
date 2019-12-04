import diff from "./diff";

function createElement(type, props, ...children) {
  props.children = children;
  let vtype = null;

  if (typeof type === "string") {
    vtype = 1;
  } else if (typeof type === "function") {
    vtype = type.isReactComponent ? 2 : 3;
  }

  return { vtype, type, props };
}

class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
    this.$cache = {};
    this.state = {};
  }

  setState(nextState, callback) {
    this.state = {
      ...this.state,
      ...nextState
    };

    this.forceUpdate();
  }

  forceUpdate() {
    const { $cache: cache } = this;
    const newVNode = this.render();
    const newNode = diff(cache, newVNode);

    this.$cache = {
      ...cache,
      vnode: newVNode,
      node: newNode
    };
  }
}
const React = { createElement, Component };

export default React;
