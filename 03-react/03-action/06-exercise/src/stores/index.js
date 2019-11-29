// import { createStore, applyMiddleware } from "redux";

import { createStore, applyMiddleware } from "../w-redux";

// import thunk from "redux-thunk";
// import logger from "redux-logger";

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

const logger = () => {
  return dispatch => action => {
    console.log(action.type, "被调用");
    dispatch(action);
  };
};

const thunk = () => {
  return dispatch => action => {
    if (typeof action === "function") {
      return action(dispatch);
    }

    return dispatch(action);
  };
};

const store = createStore(reducer, applyMiddleware(thunk, logger));
export default store;
