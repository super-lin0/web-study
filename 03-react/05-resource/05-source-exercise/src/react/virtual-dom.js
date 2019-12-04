function initVnode(vnode, container) {
  let node = null;

  const { vtype } = vnode;

  if (!vtype) {
    node = initTextNode(vnode, container);
  }

  if (vtype === 1) {
    node = initHtmlNode(vnode, container);
  }

  if (vtype === 2) {
    node = initClassNode(vnode, container);
  }

  if (vtype === 3) {
    node = initFunNode(vnode, container);
  }

  return node;
}

function initTextNode(vnode, container) {
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
    } else if (key.slice(0, 2) === "on") {
      node.addEventListener("click", rest[key]);
    }
  });

  return node;
}

function initClassNode(vnode, container) {
  const { type, props } = vnode;
  const comp = new type(props);
  const vvnode = comp.render();
  const node = initVnode(vvnode, container);

  let cache = {
    parendNode: container,
    vnode: vvnode,
    node
  };

  comp.$cache = cache;

  return node;
}

function initFunNode(vnode, container) {
  const { type, props } = vnode;

  const vvnode = type(props);

  return initVnode(vvnode, container);
}

export default initVnode;
