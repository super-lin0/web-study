import { BrowserRouter, Route, Link } from "./MReactRouter";
// import { BrowserRouter, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import Home from "./pages/home";
import User from "./pages/user";

class RouterConfig extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/home">首页</Link>
            {"   "}
            <Link to="/user">用户中心</Link>
            {"   "}
          </nav>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/user" component={User}></Route>
        </BrowserRouter>
      </div>
    );
  }
}

export default RouterConfig;
