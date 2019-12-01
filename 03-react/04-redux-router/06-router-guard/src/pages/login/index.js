import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    const {
      login: { isLogin = false },
      dispatch,
      location
    } = this.props;

    const { redirect = "/" } = location.state || {};

    if (isLogin) {
      return <Redirect to={redirect} />;
    }

    return (
      <div>
        <h3>Login</h3>
        <button onClick={() => dispatch({ type: "login" })}>登录</button>
      </div>
    );
  }
}

export default connect(({ login }) => ({ login }))(Login);
