import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./home";
import User from "./user";
import Search from "./search";

class RouterConfig extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            {"   "}
            <Link to="/user">用户中心</Link>
            <Link to="/search/25">搜索</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/user" component={User}></Route>
            <Route path="/search/:id" component={Search}></Route>
            <Route render={() => <div>404</div>}></Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default RouterConfig;
