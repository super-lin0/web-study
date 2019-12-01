import React, { Component } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";

import Home from "./home";
import User from "./user";
import Search from "./search";
import PrivatePage from "./PrivatePage";
import Login from "./login";

class RouterConfig extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <nav>
            <Link to="/">首页</Link>
            {"   "}
            <Link to="/user">用户中心</Link>
            {"  "}
            <Link to="/search/25">搜索</Link>
          </nav>
          <Switch>
            <Route exact path="/" component={Home} />
            <PrivatePage path="/user" component={User} />
            <Route path="/login" component={Login} />
            {/* <Route path="/user" component={User} /> */}
            <Route path="/search/:id" component={Search} />
            <Route render={() => <div>404</div>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default RouterConfig;
