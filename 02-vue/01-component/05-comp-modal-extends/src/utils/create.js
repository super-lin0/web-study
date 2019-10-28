import Vue from "vue";

export default function create(Component, props) {
  const Comp = Vue.extend(Component);

  const MyComponent = new Comp({
    propsData: { ...props }
  });

  const component = MyComponent.$mount();

  document.body.appendChild(component.$el);

  MyComponent.remove = function() {
    document.body.removeChild(component.$el);
    component.$destroy();
  };

  return MyComponent;
}
