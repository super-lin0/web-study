import React, { Component } from "react";
import { connect } from "../WReactRedux";
// import { connect } from "react-redux";

class HomePage extends Component {
  render() {
    console.log("props:", this.props);

    const { counter, minus, dispatch } = this.props;

    return (
      <div>
        <p>{counter}</p>
        <button onClick={() => dispatch({ type: "add" })}>+</button>
        <button onClick={minus}>-</button>
      </div>
    );
  }
}

export default connect(({ counter }) => ({ counter }), {
  add: () => ({ type: "add" }),
  minus: () => ({ type: "minus" })
})(HomePage);
