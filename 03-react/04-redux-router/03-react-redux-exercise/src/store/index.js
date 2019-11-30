import { createStore, combineReducers, applyMiddleware } from "redux";

import logger from "redux-logger";

import counterReducer from "./counter";

export default createStore(
  combineReducers({ counter: counterReducer }),
  applyMiddleware(logger)
);
