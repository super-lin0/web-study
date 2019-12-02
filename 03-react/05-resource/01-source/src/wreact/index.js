function createElement(type, props, ...children) {
  // 构建子节点
  props.children = children;

  let vtype;

  if (typeof type === "string") {
    vtype = 1;
  }
  // 返回一个vnode
  return {
    type,
    vtype,
    props
  };
}

const React = { createElement };

export default React;
