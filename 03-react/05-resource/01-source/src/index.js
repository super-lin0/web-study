import React from "./wreact";
// import React, { Component } from "react";
import ReactDOM from "./wreact/ReactDOM";
// import ReactDOM from "react-dom";
import "./index.css";

// class ClassComponent extends Component {
//   render() {
//     return (
//       <div className="border">
//         <p>{this.props.name}</p>
//       </div>
//     );
//   }
// }

function FunctionComponent(props) {
  return <div className="border">{props.name}</div>;
}

const jsx = (
  <div className="box">
    <div className="border">我是文本</div>
    {/* <ClassComponent name="Class组件" /> */}
    {/* <FunctionComponent name="Function组件" /> */}
  </div>
);

// vnode -> node -> container.appendChild(node)
ReactDOM.render(jsx, document.getElementById("root"));
