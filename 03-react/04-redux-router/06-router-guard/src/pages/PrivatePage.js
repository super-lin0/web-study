import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivatePage extends Component {
  render() {
    console.log("privatepage", this.props);
    const {
      login: { isLogin = false },
      path,
      component
    } = this.props;

    if (isLogin) {
      return <Route path={path} component={component} />;
    }
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            redirect: path
          }
        }}
      />
    );
  }
}

export default connect(({ login }) => ({ login }))(PrivatePage);
