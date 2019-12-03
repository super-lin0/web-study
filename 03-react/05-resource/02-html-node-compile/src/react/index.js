function createElement(type, props, ...children) {
  console.log("createElement", arguments);

  props.children = children;
  let vtype;

  if (typeof type === "string") {
    vtype = 1;
  }

  return {
    type,
    vtype,
    props
  };
}

const React = {
  createElement
};

export default React;
