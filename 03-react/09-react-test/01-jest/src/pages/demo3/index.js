import React, { useState } from "react";

const Demo3 = () => {
  const [message, setMessage] = useState("Hello, World");
  return (
    <div>
      <span>{message}</span>
      <button onClick={() => setMessage("你好，世界")}>submit</button>
    </div>
  );
};

export default Demo3;
