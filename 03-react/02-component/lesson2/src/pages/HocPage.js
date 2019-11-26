import React, { Component } from "react";

//定义：是一个函数，它接收一个组件并返回另一个组件。
// function Child(props) {
//   return <div>Child-{props.name}</div>;
// }
//这里的Cmp是function或者class组件
// const foo = Cmp => {
//   return props => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };

//这里的Cmp是function或者class组件
const foo = Cmp => props => {
  // console.log("foo", Cmp);
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

//处理原生标签
const fooHost = cmp => {
  console.log("fooHost", cmp);
  // return cmp;//返回原先的标签
  // return React.cloneElement(cmp, { className: "border" });
  // return React.createElement(cmp.type, { ...cmp.props, className: "border" });
  return <cmp.type {...cmp.props} />;
  // <div className="border">{/* <Cmp /> */}</div>;
};

// @foo
// @foo
class Child extends Component {
  render() {
    return <div>Child-{this.props.name}</div>;
  }
}

export default class HocPage extends Component {
  render() {
    // const Foo = foo(foo(Child));
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Child name="msg" /> */}
        {fooHost(<div>omg</div>)}
        {/* <Foo name="msg" /> */}
        {/* {foo(Child)({ name: "msg" })} */}
      </div>
    );
  }
}
