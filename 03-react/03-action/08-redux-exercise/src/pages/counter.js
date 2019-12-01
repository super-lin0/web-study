import React, { Component } from "react";
import store from "../reducer";

class Counter extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }
  add = () => {
    store.dispatch({ type: "add" });
  };
  minus = () => {
    store.dispatch({ type: "minus" });
  };

  addAsync = () => {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: "add" });
      }, 1000);
    });
  };

  render() {
    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.addAsync}>addAsync</button>
      </div>
    );
  }
}

export default Counter;
