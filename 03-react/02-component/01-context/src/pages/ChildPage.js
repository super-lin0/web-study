import React, { Component } from "react";
import GrandChildPage from "./GrandChildPage";
import TopBar from "../components/TopBar";

class ChildPage extends Component {
  render() {
    return (
      <div>
        <TopBar />
        <GrandChildPage {...this.props} />
      </div>
    );
  }
}

export default ChildPage;
