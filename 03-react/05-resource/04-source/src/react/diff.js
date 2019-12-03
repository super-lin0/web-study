import initVNode from "./virtual-dom";

function diff(cache, newVNode) {
  const { vnode, parentNode, node } = cache;
  // diff
  const newNode = initVNode(newVNode, parentNode);

  parentNode.replaceChild(newNode, node);

  return newNode;
}

export default diff;
