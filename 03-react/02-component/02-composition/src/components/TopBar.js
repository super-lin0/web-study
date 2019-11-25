import React, { Component } from "react";
import { Consumer as AppConsumer } from "../AppContext";

class TopBar extends Component {
  render() {
    return (
      <div className="border">
        <AppConsumer>
          {ctx => <>{ctx && <div>TopBar-{ctx.user.name}</div>}</>}
        </AppConsumer>
      </div>
    );
  }
}

export default TopBar;
