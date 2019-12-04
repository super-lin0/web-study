// import React from "react";
import React from "./react";
import ReactDOM from "./react/ReactDom";
import "./index.css";

function FunctionalComp(props) {
  return <div className="box">我是函数式组件, {props.name}</div>;
}

class KlassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };
  handleMinus = () => {
    this.setState({
      counter: this.state.counter - 1
    });
  };

  render() {
    const { counter } = this.state;
    return (
      <div className="box">
        我是类组件，{this.props.name}
        {[1, 2, 3].map(i => (
          <FunctionalComp key={i} name={`函数组件${i}`} />
        ))}
        <p>{counter}</p>
        <button onClick={this.handleClick}>+</button>
        <button onClick={this.handleMinus}>-</button>
      </div>
    );
  }
}

const jsx = (
  <div className="border">
    <div className="box">我是文本节点</div>
    <FunctionalComp name="Hello, 函数式组件" />
    <KlassComp name="Hello, 类组件" />
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
