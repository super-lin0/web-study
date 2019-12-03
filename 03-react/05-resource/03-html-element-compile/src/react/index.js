function createElement(type, props, ...children) {
  console.log("render:", arguments);

  props.children = children;

  let vtype = null;

  if (typeof type === "string") {
    vtype = 1;
  }

  return { vtype, type, props };
}

const React = {
  createElement
};

export default React;
