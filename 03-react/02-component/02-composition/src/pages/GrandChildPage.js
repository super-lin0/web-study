import React, { Component } from "react";
import { Consumer as AppConsumer } from "../AppContext";

class GrandChildPage extends Component {
  render() {
    console.log("grandchildpage", this.props);

    return (
      <div>
        <AppConsumer>
          {ctx => <>{ctx && <div>grandchildpage-{ctx.user.name}</div>}</>}
        </AppConsumer>
      </div>
    );
  }
}

export default GrandChildPage;
