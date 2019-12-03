import initVnode from "./virtual-dom";

function render(vnode, container) {
  console.log("render:", vnode);

  // 将虚拟节点转换为真实节点
  const node = initVnode(vnode, container);

  container.appendChild(node);
}

const ReactDOM = {
  render
};

export default ReactDOM;
