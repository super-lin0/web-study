function initVnode(vnode, container) {
  const { vtype } = vnode;
  let node = null;
  console.log("initVnode type", vtype, vnode);

  // 文本节点
  if (!vtype) {
    node = inittextNode(vnode, container);
  }

  // 原生标签
  if (vtype === 1) {
    node = initHtmlNode(vnode, container);
  }

  return node;
}

function inittextNode(vnode, container) {
  console.log("原生标签", vnode);
  return document.createTextNode(vnode);
}

function initHtmlNode(vnode, container) {
  const {
    type,
    props: { children, ...rest }
  } = vnode;
  const node = document.createElement(type);

  children.map(child => node.appendChild(initVnode(child, node)));

  console.log("原生标签:", rest);
  Object.keys(rest).forEach(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    }
  });

  return node;
}

export default initVnode;
