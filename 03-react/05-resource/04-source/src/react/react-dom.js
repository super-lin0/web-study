import initVNode from "./virtual-dom";

function render(vnode, container) {
  // vnode -> node

  const node = initVNode(vnode, container);

  container.appendChild(node);
}

const ReactDOM = { render };

export default ReactDOM;
