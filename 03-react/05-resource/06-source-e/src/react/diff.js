import initVnode from "./virtual-dom";

function diff(cache, newVnode) {
  const { parentNode, node } = cache;

  const newNode = initVnode(newVnode, parentNode);

  parentNode.replaceChild(newNode, node);

  return newNode;
}

export default diff;
