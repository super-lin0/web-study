import React, { Component } from "react";

class ClassComponentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      counter: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
    document.getElementById("test").addEventListener("click", this.setCounter);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  setCounter = () => {
    this.setState({
      counter: this.state.counter + 1
    });
    // 异步，所以这里只能获取上一次的值
    // console.log(this.state.counter);
    // setState只执行最后一次
    // this.setState({
    //   counter: this.state.counter + 2
    // });
    // 顺序执行
    // this.setState(nextState => {
    //   return {
    //     counter: nextState.counter + 1
    //   };
    // });
    // this.setState(nextState => {
    //   return {
    //     counter: nextState.counter + 2
    //   };
    // });
    console.log(this.state.counter);
  };

  setCounter2 = () => {
    // 同步执行,顺序执行
    this.setState({ counter: this.state.counter + 1 }, () =>
      console.log(this.state.counter)
    );
    console.log("ss", this.state.counter);
  };

  render() {
    const { date, counter } = this.state;
    return (
      <div>
        <h1>ClassComponentPage</h1>
        <p>{date.toLocaleTimeString()}</p>
        <p>{counter}</p>
        <button onClick={this.setCounter}>+</button>
        <button id="test">+</button>
        <button onClick={this.setCounter2}>第二个参数</button>
      </div>
    );
  }
}

export default ClassComponentPage;
