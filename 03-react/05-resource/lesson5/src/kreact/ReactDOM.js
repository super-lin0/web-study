import { initVnode } from "./virtual-dom";

function render(vnode, container) {
  console.log("vnode", vnode);
  //vnode->node
  const node = initVnode(vnode, container);
  //渲染的时候把真实的dom节点放到container里面去，diff的时候是更新
  container.appendChild(node);
}

const ReactDOM = {
  render
};

export default {
  render
};
