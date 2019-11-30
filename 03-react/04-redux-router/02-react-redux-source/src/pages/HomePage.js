import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../WReactRedux";
import counterAction from "./actions/counter";

class HomePage extends Component {
  render() {
    console.log("props", this.props);

    const { counter, add, minus } = this.props;
    return (
      <div>
        <p>{counter}</p>
        <button onClick={add}>+</button>
        <button onClick={minus}>-</button>
      </div>
    );
  }
}

export default connect(({ counter }) => ({ counter }), counterAction)(HomePage);
