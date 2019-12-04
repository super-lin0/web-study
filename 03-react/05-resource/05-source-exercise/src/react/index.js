import diff from "./diff";

function createElement(type, props, ...children) {
  props.children = children;
  console.log("createElement,", arguments);

  let vtype = null;

  if (typeof type === "string") {
    vtype = 1;
  }

  if (typeof type === "function") {
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
    // vnode -> node -> container
    const newVnode = this.render();
    const { $cache: cache } = this;

    const newNode = diff(cache, newVnode);

    this.$cache = {
      ...cache,
      vnode: newVnode,
      node: newNode
    };
  }
}

const React = { createElement, Component };

export default React;
