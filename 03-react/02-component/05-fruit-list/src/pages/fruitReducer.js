import React, { useState, useReducer, useEffect } from "react";
import FruitList from "../components/FruitList";
import FruitAdd from "../components/FruitAdd";

import reducer from "../reducers";

function FruitsReducer() {
  const [fruits, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    dispatch({ type: "init", payload: ["apple", "banana"] });
  }, []);

  return (
    <div>
      <FruitList
        fruits={fruits}
        setFruits={list => dispatch({ type: "init", payload: list })}
      />
      <FruitAdd addFruit={name => dispatch({ type: "add", payload: name })} />
    </div>
  );
}

export default FruitsReducer;
