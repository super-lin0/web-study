import React, { Component } from "react";
import store from "../store";

class Home extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }

  add() {
    store.dispatch({ type: "add" });
  }
  asyncAdd() {
    store.dispatch(dispatch => {
      setTimeout(() => {
        dispatch({ type: "add" });
      }, 1000);
    });
  }
  minus() {
    store.dispatch({ type: "minus" });
  }

  render() {
    return (
      <div>
        <p>{store.getState()}</p>
        <button onClick={this.add}>+</button>
        <button onClick={this.minus}>-</button>
        <button onClick={this.asyncAdd}>asyncAdd</button>
      </div>
    );
  }
}

export default Home;
