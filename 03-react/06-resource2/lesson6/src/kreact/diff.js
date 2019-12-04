import { initVnode } from "./virtual-dom";

//这是假的diff
export function diff(cache, newVnode) {
  const { vnode, parentNode, node } = cache;
  //newvNode
  const newNode = initVnode(newVnode, parentNode);
  console.log("node", node, newNode);
  parentNode.replaceChild(newNode, node);
  return newNode;
}
