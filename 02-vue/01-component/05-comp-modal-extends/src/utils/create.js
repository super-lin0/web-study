import Vue from "vue";

const create = (Component, props) => {
  const Comp = Vue.extend(Component);

  const MyComponent = new Comp({
    propsData: { ...props }
  });

  const component = MyComponent.$mount();

  document.body.appendChild(component.$el);

  MyComponent.remove = () => {
    document.body.removeChild(component.$el);
    component.$destroy();
  };

  return MyComponent;
};

export default create;
