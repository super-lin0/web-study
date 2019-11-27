import React from "react";
import "./App.css";
// import HookPage from "./pages/HookPage";
import HookPagePro from "./pages/HookPagePro";
import FruitList from "./pages/FruitList";
import ReducerPage from "./pages/ReducerPage";
import { Provider } from "./AppContext";
import UseContext from "./pages/UseContext";

const store = {
  user: {
    name: "zhangsan"
  }
};

function App() {
  return (
    <div className="App">
      {/* <HookPage /> */}
      <HookPagePro />
      {/* <FruitList /> */}
      {/* <ReducerPage />
      <Provider value={store}>
        <UseContext />
      </Provider> */}
    </div>
  );
}

export default App;
