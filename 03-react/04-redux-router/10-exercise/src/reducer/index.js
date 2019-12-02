import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";

import loginReducer from "./login";

const store = createStore(
  combineReducers({ login: loginReducer }),
  applyMiddleware(logger)
);

export default store;
