import React, { useState } from "react";
import List from "../components/List";
import FruitAdd from "../components/FruitAdd";

function FruitList(props) {
  const [fruit, setFruit] = useState(["apple", "banana"]);
  return (
    <div>
      <h3>FruitList</h3>
      <List fruit={fruit} setFruit={setFruit} />
      <FruitAdd addFruit={name => setFruit([...fruit, name])} />
    </div>
  );
}

export default FruitList;
