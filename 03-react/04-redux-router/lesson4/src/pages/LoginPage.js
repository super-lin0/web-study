import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class LoginPage extends Component {
  render() {
    const { isLogin, path, location, login } = this.props;
    const { redirect = "/" } = location.state || {};
    console.log("omg", this.props);
    if (isLogin) {
      return <Redirect to={redirect} />;
      //return <Route path={path} component={component} />;
    } else {
      return (
        <div>
          <h3>LoginPage</h3>
          <button onClick={login}>login</button>
        </div>
      );
    }
  }
}

export default connect(
  //mapStateToProps
  state => ({ isLogin: state.user.isLogin }),
  //mapDispatchToProps
  {
    login: () => ({ type: "successLogin" })
  }
)(LoginPage);
