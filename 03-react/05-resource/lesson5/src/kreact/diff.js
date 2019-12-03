import { initVnode } from "./virtual-dom";

//这是假的diff
export function diff(cache, newVnode) {
  const { vnode, parentNode, node } = cache;
  //newvNode
  //DIFF逻辑
  const newNode = initVnode(newVnode, parentNode);
  parentNode.replaceChild(newNode, node);
  return newNode;
}
