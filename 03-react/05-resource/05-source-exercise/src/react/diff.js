import initVNode from "./virtual-dom";

function diff(cache, newVNode) {
  const { vnode, parendNode, node } = cache;

  const newNode = initVNode(newVNode, parendNode);

  parendNode.replaceChild(newNode, node);

  return newNode;
}

export default diff;
