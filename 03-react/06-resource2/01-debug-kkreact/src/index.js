// import React, { Component } from "react";
// import ReactDOM from "react-dom";

// import React from "./kreact";
// import ReactDOM from "./kreact/ReactDOM";

import React from "./kkreact";
import ReactDOM from "./kkreact/ReactDOM";

import "./index.css";

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }
  handle = e => {
    // this.setState({
    //   counter: this.state.counter + 1
    // });
    // // 异步，所以这里只能获取上一次的值
    // console.log(this.state.counter);
    // // setState只执行最后一次;
    // this.setState({
    //   counter: this.state.counter + 2
    // });
    // 顺序执行;
    this.setState(nextState => {
      return {
        counter: nextState.counter + 1
      };
    });
    console.log("11:", this.state.counter);
    this.setState(nextState => {
      return {
        counter: nextState.counter + 2
      };
    });
    console.log("22", this.state.counter);
  };
  render() {
    const { counter } = this.state;
    return (
      <div className="border">
        <p>{this.props.name}</p>
        <button onClick={this.handle}>{counter}</button>
        {/* {[1, 2, 3].map(item => {
          return <FunctionComponent key={item} name="function组件" />;
        })} */}
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
