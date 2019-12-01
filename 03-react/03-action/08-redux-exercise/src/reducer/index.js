// import { createStore, applyMiddleware } from "redux";

// import thunk from "redux-thunk";
// import logger from "redux-logger";
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

const logger = () => dispatch => action => {
  console.log(action.type + ":被触发了");

  return dispatch(action);
};

const thunk = () => dispatch => action => {
  if (typeof action === "function") {
    return action(dispatch);
  }
  return dispatch(action);
};

export default createStore(reducer, applyMiddleware(thunk, logger));
