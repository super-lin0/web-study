import React, { Component } from "react";
import { Form, Input, Button, message } from "antd";

const nameRules = {
  required: true,
  message: "用户名不能为空"
};
const pwdRules = {
  required: true,
  message: "密码不能为空"
};

@Form.create()
class AntdForm extends Component {
  submit = () => {
    console.log("submit");
    const {
      form: { validateFields, getFieldsValue }
    } = this.props;

    console.log("values:", getFieldsValue());

    validateFields((err, values) => {
      if (err) {
        return;
      } else {
        console.log(values);
        message.success("登录成功");
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("props:", this.props);

    return (
      <div>
        <Form>
          <Form.Item label="用户名">
            {getFieldDecorator("name", { rules: [nameRules] })(<Input />)}
          </Form.Item>
          <Form.Item label="密码">
            {getFieldDecorator("password", { rules: [pwdRules] })(
              <Input type="password" />
            )}
          </Form.Item>
          <Button onClick={this.submit}>提交</Button>
        </Form>
      </div>
    );
  }
}

export default AntdForm;
