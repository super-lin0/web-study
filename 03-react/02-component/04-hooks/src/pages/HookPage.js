import React, { useState, useEffect } from "react";

const HookPage = () => {
  const [date, setDate] = useState(new Date());
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>{date.toLocaleTimeString()}</p>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

export default HookPage;
