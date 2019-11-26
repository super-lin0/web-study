import React, { useState, useEffect } from "react";

const HookPageUseClock = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{useClock().toLocaleTimeString()}</p>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

// 自定义hook,一定要使用use开头
function useClock(params) {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return date;
}

export default HookPageUseClock;
