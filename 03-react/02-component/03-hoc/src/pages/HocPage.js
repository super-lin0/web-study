import React, { Component } from "react";

// function Child(props) {
//   return <div>{props.name}</div>;
// }

const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};
// 处理原生标签
const fooHost = cmp => {
  // return React.cloneElement(cmp, { className: "border" });
  // return React.createElement(cmp.type, { ...cmp.props, className: "border" });
  return <cmp.type {...cmp.props} className="border"></cmp.type>;
};

// @foo
class Child extends Component {
  render() {
    return <div>child-{this.props.name}</div>;
  }
}

class HocPage extends Component {
  render() {
    const Foo = foo(Child);
    return (
      <div>
        <h3>HocPage</h3>
        <Foo name="msg" />
        {fooHost(<div>omg</div>)}
      </div>
    );
  }
}

export default HocPage;
