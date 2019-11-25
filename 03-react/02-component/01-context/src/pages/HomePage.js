import React, { Component } from "react";
import ChildPage from "./ChildPage";

import { Provider as AppProvider } from "../AppContext";

const Context = React.createContext();

const Provider = Context.Provider;
const Consumer = Context.Consumer;

const store = {
  user: {
    name: "小明"
  }
};

class HomePage extends Component {
  render() {
    return (
      <div>
        {/* 方法一：props */}
        <ChildPage {...store} />
        {/* 方法二：context */}
        {/* <Provider value={store}>
          <Consumer>
            {ctx => (
              <>
                <div>homepage-{ctx.user.name}</div>
                <ChildPage {...ctx} />
              </>
            )}
          </Consumer>
        </Provider> */}
        {/* 方法三抽取 AppContext */}
        <AppProvider value={store}>
          <ChildPage />
        </AppProvider>
      </div>
    );
  }
}

export default HomePage;
