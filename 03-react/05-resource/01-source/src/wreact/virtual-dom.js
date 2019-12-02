// 当前函数需要把vnode变成node
function initVnode(vnode, container) {
  let node = null;

  const { vtype } = vnode;

  if (!vtype) {
    node = initTextNode(vnode, container);
  }

  if (vtype === 1) {
    // 原生标签
    node = initHtmlNode(vnode, container);
  }

  return node;
}

function initTextNode(vnode, container) {
  const node = document.createTextNode(vnode);
  return node;
}

function initHtmlNode(vnode, container) {
  const {
    type,
    props: { children, ...rest }
  } = vnode;
  const node = document.createElement(type);

  children.map(child => {
    node.appendChild(initVnode(child, node));
  });
  Object.keys(rest).map(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    }
  });
  return node;
}

export default initVnode;
