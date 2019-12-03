import React from "./react";
// import React from "react";
// import ReactDOM from "react-dom";
import ReactDOM from "./react/react-dom";
import "./index.css";

class KlassComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    };
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

  render() {
    const { counter } = this.state;
    return (
      <div className="box">
        <p>我是类组件，{this.props.name}</p>
        {[1, 2, 3].map(item => {
          return (
            <FunctionComp
              key={item}
              name={"function组件，" + item}
            ></FunctionComp>
          );
        })}
        <p>{counter}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

// 函数组件
function FunctionComp(props) {
  return <div className="box">我是函数组件， {props.name}</div>;
}

const jsx = (
  <div className="border">
    <div className="box">我是文本</div>
    <FunctionComp name="func"></FunctionComp>
    <KlassComp name="klass"></KlassComp>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
