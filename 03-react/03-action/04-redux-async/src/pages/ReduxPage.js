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
  addAsync = () => {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: "add" });
      }, 1000);
    });
  };
  minus = () => {
    store.dispatch({ type: "minus" });
  };

  render() {
    console.log("store:", store);

    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.addAsync}>asyncAdd</button>
      </div>
    );
  }
}

export default ReduxPage;
