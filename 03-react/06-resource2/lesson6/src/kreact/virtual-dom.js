//当前函数需要把vnode变成node
export function initVnode(vnode, container) {
  let node = null;
  const { vtype } = vnode;
  if (!vtype) {
    node = initTxtNode(vnode, container);
  }
  if (vtype === 1) {
    //原生标签
    node = initHtmlNode(vnode, container);
  }
  if (vtype === 2) {
    //class组件
    node = initClassComponent(vnode, container);
  }
  if (vtype === 3) {
    //function 组件
    node = initFunctionComponent(vnode, container);
  }

  return node; //最终返回真实dom节点
}

function initTxtNode(vnode, container) {
  const node = document.createTextNode(vnode);
  return node;
}

function initHtmlNode(vnode, container) {
  const { type, props } = vnode; //type是个string
  const node = document.createElement(type);
  const { children, ...rest } = props;
  children.map(item => {
    if (Array.isArray(item)) {
      for (let i of item) {
        node.appendChild(initVnode(i, node));
      }
    } else {
      node.appendChild(initVnode(item, node));
    }
  });
  Object.keys(rest).map(key => {
    if (key === "className") {
      node.setAttribute("class", rest[key]);
    } else if (key.slice(0, 2) === "on") {
      //如果属性值以on开头，就当做是click事件
      node.addEventListener("click", rest[key]);
    }
  });
  return node;
}

function initFunctionComponent(vnode, container) {
  const { type, props } = vnode;
  const vvnode = type(props);
  return initVnode(vvnode, container);
}

//把class组件变成真实dom节点
function initClassComponent(vnode, container) {
  const { type, props } = vnode;
  const cmp = new type(props);
  const vvnode = cmp.render();
  const node = initVnode(vvnode, container);
  let cache = {
    vnode: vvnode, //当前的虚拟dom节点， 用于diff
    node, //真实的dom节点，可以用于最后的替换
    parentNode: container
  };
  cmp.$cache = cache;
  return node;
}
