import Vue from "vue";

// 挂载它，生成dom结构

// 把生成的dom结构追加到body

// 不需要时组件实例应该被销毁

export default function create(component: any, props: object) {
  // 创建传入组件的实例
  const app = new Vue({
    render(h) {
      return h(component, { props });
    }
  }).$mount();

  document.body.appendChild(app.$el);

  // 获取组件实例
  const comp = app.$children[0];

  comp.remove = () => {
    // 移除dom,
    document.body.removeChild(app.$el);

    // 销毁组件
    app.$destroy();
  };

  return comp;
}
