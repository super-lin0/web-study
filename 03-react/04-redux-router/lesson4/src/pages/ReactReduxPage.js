import React, { Component } from "react";
// import { connect } from "react-redux";
import { connect } from "../kReactRedux";
import { add } from "../action/reactReduxPage";

class ReactReduxPage extends Component {
  render() {
    const { counter, dispatch, add } = this.props;
    console.log("props", this.props);
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <p>{counter}</p>
        {/* <button onClick={() => dispatch({ type: "add" })}>add</button> */}
        <button onClick={add}>add</button>
      </div>
    );
  }
}

export default connect(
  //mapStateToProps
  state => ({ counter: state.counter }),
  //mapDispatchToProps
  {
    add
  }
)(ReactReduxPage);

////，执行add，返回的不就是一个action，比如{type: 'add'}
//dispatch(add())
