import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Login extends Component {
  render() {
    console.log("Login page", this.props);

    const { isLogin, login, location } = this.props;

    const { redirect = "/" } = location.state || {};

    if (isLogin) {
      return <Redirect to={redirect} />;
    }
    return (
      <div>
        <h3>登录</h3>
        <button onClick={login}>登录</button>
      </div>
    );
  }
}

export default connect(({ login }) => ({ isLogin: login.isLogin }), {
  login: () => ({ type: "login" })
})(Login);
