import React, { Component } from "react";
import { handleConsumer } from "../AppContext";

@handleConsumer
class TopBar extends Component {
  render() {
    return <div className="border">top-bar{this.props.user.name}</div>;
  }
}

export default TopBar;
