import React, { Component } from "react";
import myFormCreators from "../components/MFormCreators";

const nameRules = {
  required: true,
  message: "请输入用户名"
};

const pwdRules = {
  required: true,
  message: "请输入密码"
};

@myFormCreators
class MyForm extends Component {
  submit = () => {
    const { getFieldsValue, getFieldValue, validateFields } = this.props;
    validateFields((err, values) => {
      console.log("err:", err);

      if (err) {
        return;
      }
      console.log("getFieldsValue:", getFieldsValue());
      console.log("getFieldValue:", getFieldValue("name"));
    });
  };
  render() {
    console.log("MyForm", this.porps);

    const { getFieldDecorator } = this.props;

    return (
      <div>
        <h3>Login</h3>
        用户名：{getFieldDecorator("name", { rules: [nameRules] })(<input />)}
        密码：
        {getFieldDecorator("password", { rules: [pwdRules] })(
          <input type="password" />
        )}
        <button onClick={this.submit}>登录</button>
      </div>
    );
  }
}

export default MyForm;
