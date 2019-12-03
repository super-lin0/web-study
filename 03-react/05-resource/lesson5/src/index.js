// import React, { Component } from "react";
// import ReactDOM from "react-dom";

import React from "./kreact";
import ReactDOM from "./kreact/ReactDOM";

import "./index.css";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  handle = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  render() {
    const { counter } = this.state;
    return (
      <div className="border">
        <p>{this.props.name}</p>
        <button onClick={this.handle}>{counter}</button>
        {[1, 2, 3].map(item => {
          return <FunctionComponent key={item} name="function组件" />;
        })}
      </div>
    );
  }
}

function FunctionComponent(props) {
  return <div className="border">{props.name}</div>;
}
const jsx = (
  <div className="box">
    <div className="border">我是文本</div>
    <ClassComponent name="class组件" />
    <FunctionComponent name="function组件" />
  </div>
);

//vnode->node
//container.apppendChild(node)
ReactDOM.render(jsx, document.getElementById("root"));
