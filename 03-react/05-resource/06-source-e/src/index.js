import React from "./react";
import ReactDOM from "./react/ReactDom";
import "./index.css";

class KlassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleAdd = () => {
    this.setState({ counter: this.state.counter + 1 });
  };
  handleMinus = () => {
    this.setState({ counter: this.state.counter - 1 });
  };

  render() {
    const { counter } = this.state;
    return (
      <div className="border">
        <p>我是类组件,{this.props.name}</p>
        {[1, 2, 3].map(i => (
          <FuncComponent name={`数组组件${i}`}></FuncComponent>
        ))}
        <p>{counter}</p>
        <button onClick={this.handleAdd}>+</button>
        <button onClick={this.handleMinus}>-</button>
      </div>
    );
  }
}

function FuncComponent(props) {
  return <div className="border">我是函数组件, {props.name}</div>;
}

const jsx = (
  <div>
    <div className="border">文本节点</div>
    <FuncComponent name="zhangsan"></FuncComponent>
    <KlassComponent name="lisi"></KlassComponent>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
