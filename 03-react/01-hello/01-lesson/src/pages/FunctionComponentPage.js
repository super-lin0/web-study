import React, { useState, useEffect } from "react";

const FunctionComponentPage = props => {
  // 相当于this.state = {date: new Date()};
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);

  // 值的改变称为副作用，第一个参数为函数，函数称为副作用，有点类似componentDidMount，ComponentWillUnMount结合
  // 第二个参数表示副作用跟谁依赖，空数组表示组件跟新副作用不需要重复执行，若外界date值改变，需要重新执行副作用函数，则第二个参数为[date]
  //  组件更新的时候是否需要useEffect重新执行，取决于这个参数，这个参数可理解为componentDidUpdate，
  useEffect(() => {
    console.log("useEffect");

    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // 组件卸载时候执行，相当于componentWillUnmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>FunctionComponentPage</h3>
      <p>{date.toLocaleTimeString()}</p>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

export default FunctionComponentPage;
