import React, { Component } from "react";

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    console.log("constructor");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", state);
    // 返回null则对state不做任何改变
    return state.counter < 6 ? null : { counter: 0 };
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate", prevState);
    return { ...prevState, omg: "aaa" };
  }

  componentDidUpdate(prevProps, prevState, others) {
    console.log("componentDidUpdate", prevState, others);
  }

  render() {
    console.log("render");

    const { counter } = this.state;
    return (
      <div>
        <h1>lifecycle 16.9</h1>
        <p>{counter}</p>
        <button onClick={this.setCounter}>+</button>
      </div>
    );
  }
}

export default Lifecycle;
