import React, { useState, useEffect } from "react";

const HookPageUseClock = () => {
  const [date, counter, setCounter] = useClock();
  return (
    <div>
      <p>{date.toLocaleTimeString()}</p>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

// 自定义hook,一定要使用use开头
function useClock() {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return [date, counter, setCounter];
}

export default HookPageUseClock;
