import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

export default store;
