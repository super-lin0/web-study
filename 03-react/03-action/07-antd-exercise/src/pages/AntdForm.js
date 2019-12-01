import React, { Component } from "react";
import { Button, Input, Form, message } from "antd";

const FormItem = Form.Item;

const nameRules = {
  required: true,
  message: "请输入用户名"
};

const pwdRules = {
  required: true,
  message: "请输入密码"
};

@Form.create()
class AntdForm extends Component {
  submit = () => {
    const {
      form: { getFieldsValue, getFieldValue, validateFields }
    } = this.props;

    validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log("getFieldsValue:", getFieldsValue());
      console.log("getFieldValue:", getFieldValue("name"));

      message.success("登录成功");
    });
  };
  render() {
    // console.log("props", this.props);

    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h3>Login</h3>
        <Form>
          <FormItem label="用户名">
            {getFieldDecorator("name", { rules: [nameRules] })(<Input />)}
          </FormItem>
          <FormItem label="密码">
            {getFieldDecorator("password", { rules: [pwdRules] })(
              <Input type="password" />
            )}
          </FormItem>
        </Form>

        <Button onClick={this.submit}>登录</Button>
      </div>
    );
  }
}

export default AntdForm;
