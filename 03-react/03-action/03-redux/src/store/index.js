import { createStore } from "../components/WRedux";
// import { createStore } from "redux";

function reducer(state = 0, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

export default createStore(reducer);
