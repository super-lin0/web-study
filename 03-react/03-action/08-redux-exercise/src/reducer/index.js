// import { createStore, applyMiddleware } from "redux";

import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "../WRedux";
function reducer(state = 0, action) {
  console.log("state:", state);

  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

export default createStore(reducer, applyMiddleware(thunk, logger));
