import React, { Component } from "react";

class Lifecycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
    console.log("constructor");
  }

  componentWillMount() {
    console.log("componentWillMount");
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  // 只有在已挂载的组件Props更新之前执行
  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    return true;
  }

  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    console.log("render");

    const { counter } = this.state;
    return (
      <div>
        <h1>lifecycle</h1>
        <p>{counter}</p>
        <button onClick={this.setCounter}>+</button>
      </div>
    );
  }
}

export default Lifecycle;
