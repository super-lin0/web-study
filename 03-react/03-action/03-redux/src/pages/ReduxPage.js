import React, { Component } from "react";
import store from "../store";

class ReduxPage extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  add = () => {
    store.dispatch({ type: "add" });
  };
  minus = () => {
    store.dispatch({ type: "minus" });
  };

  render() {
    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
      </div>
    );
  }
}

export default ReduxPage;
