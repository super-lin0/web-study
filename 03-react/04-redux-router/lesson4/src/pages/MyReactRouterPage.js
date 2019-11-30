import React, { Component } from "react";
// import { BrowserRouter, Link, Route } from "react-router-dom";
import { BrowserRouter, Link, Route } from "../kReactRouterDom";
import HomePage from "./HomePage";
import UserPage from "./UserPage";

export default class MyReactRouterPage extends Component {
  render() {
    return (
      <div>
        <h3>MyReactRouterPage</h3>
        <BrowserRouter>
          <Link to="/home">首页</Link>
          <Link to="/user">用户中心</Link>
          <Route path="/home" component={HomePage} />
          <Route path="/user" component={UserPage} />
        </BrowserRouter>
      </div>
    );
  }
}
