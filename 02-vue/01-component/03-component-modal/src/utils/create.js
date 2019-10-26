// 1、创建传入的组件实例
// 2、挂载它从而生成dom结构
// 3、把生成的dom结构追加到body
// 4、淘汰机制：不需要时，组件实例应当被销毁，防止内存泄漏
import Vue from "vue";

export default function create(Component, props) {
  // 1、创建传入的组件实例
  const vm = new Vue({
    render(h) {
      // h即是createElement(tag, data, children)
      // 返回虚拟dom
      return h(Component, { props });
    }
  }).$mount(); // 只挂载不设置宿主；意思是执行初始化过程，但是不会执行具体dom操作

  document.body.appendChild(vm.$el);

  // 获取组件实例
  const comp = vm.$children[0];

  // 在实例上附加删除方法
  comp.remove = () => {
    //移除dom
    document.body.removeChild(vm.$el);

    //销毁组件
    vm.$destroy();
  };
  return comp;
}
