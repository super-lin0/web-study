import React, { Component } from "react";
import WFormCreate from "../components/WForm";

const nameRules = {
  required: true,
  message: "用户名不能为空"
};
const pwdRules = {
  required: true,
  message: "密码不能为空"
};

@WFormCreate
class MyForm extends Component {
  submit = () => {
    console.log("submit");

    const { validateFields, getFieldsValue } = this.props;

    // console.log("values:", getFieldsValue());

    validateFields((err, values) => {
      if (err) {
        console.log("My Form err:", err);

        return;
      } else {
        console.log("登录成功", values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props;
    // console.log("props", this.props);

    return (
      <>
        {getFieldDecorator("name", { rules: [nameRules] })(<input />)}
        {getFieldDecorator("password", { rules: [pwdRules] })(
          <input type="password" />
        )}
        <button onClick={this.submit}>提交</button>
      </>
    );
  }
}

export default MyForm;
