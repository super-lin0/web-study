import React from "react";
import HomePage from "./pages/HomePage";
import { Provider, Consumer } from "./AppContext";
import HocPage from "./pages/HocPage";
import { HookPage } from "./pages/HookPage";
import { UseReducerPage } from "./pages/UseReducerPage";
import { UseContextPage } from "./pages/UseContextPage";
// const Context = React.createContext();
// const Provider = Context.Provider; //提供者
// const Consumer = Context.Consumer; //消费者

const store = {
  user: {
    name: "小明"
  }
};

function App() {
  return (
    <div className="App">
      {/* <HomePage {...store} /> */}
      <Provider value={store}>
        {/* <HomePage /> */}
        {/* <Consumer>
          {ctx => (
            <>
              <div>{ctx.user.name}</div>
              <HomePage {...ctx}></HomePage>
            </>
          )}
        </Consumer> */}
        {/* <UseContextPage /> */}
      </Provider>
      {/* <HocPage /> */}
      <HookPage />
      {/* <UseReducerPage /> */}
    </div>
  );
}

export default App;
