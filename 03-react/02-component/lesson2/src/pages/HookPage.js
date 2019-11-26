import React, { useState, useEffect, useLayoutEffect } from "react";
import { FruitList } from "../components/FruitList";
import { FruitAdd } from "../components/FruitAdd";

export function HookPage(props) {
  const [fruit, setFruit] = useState(["apple", "banana"]);
  return (
    <div>
      <h3>HookPage</h3>
      <p>{useClock().toLocaleTimeString()}</p>
      <FruitAdd addFruit={name => setFruit([...fruit, name])} />
      <FruitList fruit={fruit} setFruit={setFruit} />
    </div>
  );
}

//自定义hook(custom hook)，一定要用use开头
function useClock() {
  const [date, setDate] = useState(new Date());
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  });
  useEffect(() => {
    console.log(";hhh");
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(timer); //unmount
  }, []);
  return date;
}
