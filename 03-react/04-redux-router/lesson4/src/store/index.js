import { createStore, combineReducers } from "redux";
import counterReducer from "./counterReducer";

const initLogin = {
  isLogin: false,
  user: { name: "" }
};
function loginReducer(state = { ...initLogin }, action) {
  switch (action.type) {
    case "successLogin":
      return { isLogin: true, user: { name: "xiaoming" } };
    default:
      return state;
  }
}

const store = createStore(
  combineReducers({
    counter: counterReducer,
    user: loginReducer
  })
);

export default store;
