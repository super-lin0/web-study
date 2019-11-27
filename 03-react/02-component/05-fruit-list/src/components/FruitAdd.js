import React, { useState } from "react";

function FruitAdd({ addFruit }) {
  const [name, setName] = useState("");
  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={() => addFruit(name)}>添加</button>
    </div>
  );
}

export default FruitAdd;
