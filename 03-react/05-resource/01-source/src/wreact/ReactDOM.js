import initVnode from "./virtual-dom";

function render(vnode, container) {
  // 将虚拟node转换为真实node节点
  const node = initVnode(vnode, container);

  // 将真实node节点添加到container中
  container.appendChild(node);
}

const ReactDOM = { render };

export default ReactDOM;
