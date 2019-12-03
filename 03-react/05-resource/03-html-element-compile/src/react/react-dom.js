import initVNode from "./virtual-diff";

function render(vnode, container) {
  console.log("react-dom:", vnode);

  // 将虚拟node转换为真实node
  const node = initVNode(vnode, container);

  // appendChild

  container.appendChild(node);
}

const ReactDOM = { render };

export default ReactDOM;
