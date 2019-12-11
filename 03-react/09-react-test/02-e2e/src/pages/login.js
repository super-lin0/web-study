import React, { Component } from "react";

class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      message: "未登录"
    };
  }

  login = () => {
    const { userName, password } = this.state;
    if (userName === "admin" && password === "123") {
      this.setState({ message: "登录成功" });
    } else {
      this.setState({ message: "登录失败" });
    }
  };

  render() {
    const { message } = this.state;
    return (
      <div>
        <h3 id="message">{message}</h3>用户名:
        <input
          id="username"
          type="text"
          onChange={e => this.setState({ userName: e.target.value })}
        />
        密码：
        <input
          type="password"
          id="password"
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button onClick={this.login}>登录</button>
      </div>
    );
  }
}

export default login;
