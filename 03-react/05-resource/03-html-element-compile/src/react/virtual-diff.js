function initVNode(vnode, container) {
  const { vtype } = vnode;
  let node = null;

  if (!vtype) {
    // 文本节点
    node = initTextNode(vnode, container);
  }

  // 原生标签
  if (vtype === 1) {
    node = initHtmlNode(vnode, container);
  }

  return node;
}

function initTextNode(vnode, container) {
  return document.createTextNode(vnode);
}

function initHtmlNode(vnode, container) {
  console.log("initHtmlNode:", vnode);
  const {
    type,
    props: { children, ...rest }
  } = vnode;

  const node = document.createElement(type);

  children.map(child => node.appendChild(initVNode(child, node)));

  Object.keys(rest).forEach(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    }
  });

  return node;
}

export default initVNode;
