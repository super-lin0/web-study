import React, { Component } from "react";
import { connect } from "react-redux";

class ReactReduxPage extends Component {
  render() {
    console.log("props:", this.props);
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

function mapStateToProps(state) {
  return { counter: state };
}
const mapDispatchToProps = {
  minus: () => ({ type: "minus" }),
  add: () => ({ type: "add" })
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
