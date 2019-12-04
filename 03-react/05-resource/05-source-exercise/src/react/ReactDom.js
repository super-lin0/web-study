import initVnode from "./virtual-dom";

function render(vnode, container) {
  const node = initVnode(vnode, container);
  container.appendChild(node);
}

const ReactDOM = { render };

export default ReactDOM;
