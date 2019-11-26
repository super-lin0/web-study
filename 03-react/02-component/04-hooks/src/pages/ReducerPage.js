import React, { useReducer, useEffect } from "react";
import List from "../components/List";
import FruitAdd from "../components/FruitAdd";

function fruitReducer(state = [], action) {
  switch (action.type) {
    case "init":
    case "replace":
      return [...action.payload];
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}

function ReducerPage(props) {
  const [fruit, dispatch] = useReducer(fruitReducer, []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "init", payload: ["apple", "banana"] });
    }, 1000);
  }, []);

  return (
    <div>
      <h3>ReducerPage</h3>
      <List
        fruit={fruit}
        setFruit={newList => dispatch({ type: "replace", payload: newList })}
      />
      <FruitAdd addFruit={name => dispatch({ type: "add", payload: name })} />
    </div>
  );
}

export default ReducerPage;
