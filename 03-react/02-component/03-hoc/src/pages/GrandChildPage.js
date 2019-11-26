import React, { Component } from "react";
import { handleConsumer } from "../AppContext";

class GrandChildPage extends Component {
  render() {
    console.log("grandchildpage", this.props);
    const HandleConsumer = handleConsumer(handleChild);

    return (
      <div>
        {/* <Consumer>
          {ctx => <>{ctx && <div>grandchildpage-{ctx.user.name}</div>}</>}
        </Consumer> */}
        {/* {this.props.user.name} */}
        <HandleConsumer />
      </div>
    );
  }
}

function handleChild(props) {
  return <div>grandchildpage-{props.user.name}</div>;
}

export default GrandChildPage;
