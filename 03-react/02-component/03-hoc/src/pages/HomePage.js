import React, { Component } from "react";
import ChildPage from "./ChildPage";

import { Provider } from "../AppContext";

const store = {
  user: {
    name: "小明"
  }
};

class HomePage extends Component {
  render() {
    return (
      <div>
        <Provider value={store}>
          <ChildPage />
        </Provider>
      </div>
    );
  }
}

export default HomePage;
