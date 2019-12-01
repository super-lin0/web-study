import React, { Component } from "react";
import { BrowserRouter, Link, Route } from "../WReactRouterDom";
// import { BrowserRouter, Link, Route } from "react-router-dom";

import Home from "./home";
import User from "./user";

class RouterConfig extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to="/home">首页</Link>
          {"   "}
          <Link to="/user">用户中心</Link>
          <Route path="/home" component={Home} />
          <Route path="/user" component={User} />
        </BrowserRouter>
      </div>
    );
  }
}

export default RouterConfig;
