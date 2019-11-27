import React, { useState } from "react";
import FruitList from "../components/FruitList";
import FruitAdd from "../components/FruitAdd";

function Fruits(props) {
  const [fruits, setFruits] = useState(["apple", "banana"]);
  return (
    <div>
      <FruitList fruits={fruits} setFruits={setFruits} />
      <FruitAdd addFruit={name => setFruits([...fruits, name])} />
    </div>
  );
}

export default Fruits;
