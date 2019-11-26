import React, { useState, useEffect, useReducer } from "react";
import { FruitList } from "../components/FruitList";
import { FruitAdd } from "../components/FruitAdd";

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

export function UseReducerPage(props) {
  const [fruit, dispatch] = useReducer(fruitReducer, []);
  console.log("user", useReducer(fruitReducer, []));
  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "init", payload: ["apple", "banana"] });
    }, 1000);
  }, []);
  return (
    <div>
      <h3>UseReducerPage</h3>
      <FruitList
        fruit={fruit}
        setFruit={newList => dispatch({ type: "replace", payload: newList })}
      />
      <FruitAdd addFruit={name => dispatch({ type: "add", payload: name })} />
    </div>
  );
}
