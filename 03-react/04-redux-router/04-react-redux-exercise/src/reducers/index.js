import { createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import counterReducer from "./counter";

const store = createStore(
  combineReducers({
    counter: counterReducer
  }),
  applyMiddleware(logger)
);

export default store;
