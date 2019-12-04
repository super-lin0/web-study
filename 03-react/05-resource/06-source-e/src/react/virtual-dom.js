function initVnode(vnode, container) {
  const { vtype } = vnode;
  let node = null;

  if (!vtype) {
    node = initextNode(vnode, container);
  }

  if (vtype === 1) {
    node = initHtmlNode(vnode, container);
  }

  if (vtype === 2) {
    node = initClassNode(vnode, container);
  }

  if (vtype === 3) {
    node = initFuncNode(vnode, container);
  }

  return node;
}

function initextNode(vnode, container) {
  return document.createTextNode(vnode);
}

function initHtmlNode(vnode, container) {
  const {
    type,
    props: { children, ...rest }
  } = vnode;

  const node = document.createElement(type);

  children.map(child => {
    if (Array.isArray(child)) {
      child.map(item => node.appendChild(initVnode(item, node)));
    } else {
      node.appendChild(initVnode(child, node));
    }
  });

  Object.keys(rest).forEach(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    }

    if (key.slice(0, 2) === "on") {
      node.addEventListener("click", rest[key]);
    }
  });

  return node;
}

function initFuncNode(vnode, container) {
  const { type, props } = vnode;
  const node = type(props);
  return initVnode(node, container);
}

function initClassNode(vnode, container) {
  const { type, props } = vnode;
  const comp = new type(props);
  const vvnode = comp.render();
  const node = initVnode(vvnode, container);

  const cache = {
    vnode: vvnode,
    node,
    parentNode: container
  };

  comp.$cache = cache;

  return node;
}

export default initVnode;
