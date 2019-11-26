import React, { Component } from "react";
import { handleConsumer } from "../AppContext";

class GrandChildPage extends Component {
  render() {
    console.log("grandchildpage", this.props);
    // 方法一：函数组件
    const HandleConsumer = handleConsumer(handleChild);

    return (
      <div>
        <HandleConsumer />
        {/* 方法二：类组件 */}
        <GrandChildPageTest />
      </div>
    );
  }
}

function handleChild(props) {
  return <div>grandchildpageFunc-{props.user.name}</div>;
}

@handleConsumer
class GrandChildPageTest extends Component {
  render() {
    return <div>GrandChildPageClass-{this.props.user.name}</div>;
  }
}

export default GrandChildPage;
