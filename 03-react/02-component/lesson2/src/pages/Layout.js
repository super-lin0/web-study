import React, { Component } from "react";
import TopBar from "../components/TopBar";

export default class Layout extends Component {
  componentDidMount() {
    const { title = "商城" } = this.props;
    document.title = title;
  }
  render() {
    const { children, showTopBar } = this.props;
    console.log("props", this.props);
    return (
      <div>
        {showTopBar && <TopBar />}
        {this.props.children.btn}
        {children.txt}
      </div>
    );
  }
}
