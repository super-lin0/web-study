import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Login extends Component {
  render() {
    console.log("login page props", this.props);

    const { login, location, isLogin } = this.props;

    const { redirect = "/" } = location.state || {};

    if (isLogin) {
      return <Redirect to={redirect} />;
    }

    return (
      <div>
        <h3>Login</h3>
        <button onClick={login}>登录</button>
      </div>
    );
  }
}

export default connect(({ login }) => ({ isLogin: login.isLogin }), {
  login: () => ({ type: "login" })
})(Login);
