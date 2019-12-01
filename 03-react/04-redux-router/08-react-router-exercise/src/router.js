import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import React, { Component } from "react";
import Home from "./pages/home";
import User from "./pages/user";
import Login from "./pages/login";
import PrivatePage from "./pages/PrivatePage";

class RouterConfig extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            {"   "}
            <Link to="/user">用户中心</Link>
            {"   "}
            <Link to="/login">登录</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <PrivatePage path="/user" component={User}></PrivatePage>
            {/* <Route path="/user" component={User}></Route> */}
            <Route path="/login" component={Login}></Route>
            <Route render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default RouterConfig;
