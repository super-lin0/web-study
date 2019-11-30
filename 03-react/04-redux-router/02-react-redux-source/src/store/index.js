import { createStore, combineReducers, applyMiddleware } from "redux";

import logger from "redux-logger";

import CounterReducer from "./counter";

export default createStore(
  combineReducers({ counter: CounterReducer }),
  applyMiddleware(logger)
);
