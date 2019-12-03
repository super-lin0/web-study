function initVNode(vnode, container) {
  let node = null;
  const { vtype } = vnode;

  if (!vtype) {
    node = initTextNode(vnode, container);
  }

  if (vtype === 1) {
    // 原生标签
    node = initHtmlNode(vnode, container);
  }

  if (vtype === 2) {
    node = initClassNode(vnode, container);
  }

  // 函数组件
  if (vtype === 3) {
    node = initFuncCompNode(vnode, container);
  }

  return node;
}

function initTextNode(vnode, container) {
  return document.createTextNode(vnode);
}

function initHtmlNode(vnode, container) {
  let {
    type, // type是字符串
    props: { children, ...rest }
  } = vnode;

  const node = document.createElement(type);

  children.map(child => {
    if (Array.isArray(child)) {
      for (let i of child) {
        node.appendChild(initVNode(i, node));
      }
    } else {
      node.appendChild(initVNode(child, node));
    }
  });

  Object.keys(rest).forEach(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    } else if (key.slice(0, 2) === "on") {
      // 如果属性值以on开头，则当作click事件
      node.addEventListener("click", rest[key]);
    }
  });

  return node;
}

function initFuncCompNode(vnode, container) {
  const { type, props } = vnode;
  const vvnode = type(props);

  return initVNode(vvnode, container);
}

// 把class组件变成真实node节点
function initClassNode(vnode, container) {
  const { type, props } = vnode;
  const comp = new type(props);

  const vvnode = comp.render();
  const node = initVNode(vvnode, container);
  let cache = {
    parentNode: container,
    vnode: vvnode, // 当前虚拟dom节点，用于diff
    node // 真实dom节点，用于替换
  };

  comp.$cache = cache;

  return node;
}

export default initVNode;
