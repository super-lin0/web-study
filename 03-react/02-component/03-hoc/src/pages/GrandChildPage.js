import React, { Component } from "react";
import { handleConsumer } from "../AppContext";

class GrandChildPage extends Component {
  render() {
    console.log("grandchildpage", this.props);
    const HandleConsumer = handleConsumer(handleChild);

    return (
      <div>
        <HandleConsumer />
        <GrandChildPageTest />
      </div>
    );
  }
}

function handleChild(props) {
  return <div>grandchildpage-{props.user.name}</div>;
}

@handleConsumer
class GrandChildPageTest extends Component {
  render() {
    return <div>GrandChildPageTest-{this.props.user.name}</div>;
  }
}

export default GrandChildPage;
