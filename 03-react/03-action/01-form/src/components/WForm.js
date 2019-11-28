import React, { Component } from "react";
import Schema from "async-validator";

const WFormCreate = Comp => {
  return class WForm extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    setChange = event => {
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    };

    getFieldDecorator = (field, options) => InputCmp => {
      this.options[field] = options;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field] || "",
        onChange: this.setChange
      });
    };

    getFieldsValue = () => {
      return this.state;
    };

    getFieldValue = name => {
      return this.state[name];
    };

    validateFields = callback => {
      const error = {};
      Object.keys(this.options).forEach(field => {
        const rules = this.options[field].rules;
        const value = this.state[field];

        const schema = new Schema({
          [field]: rules
        });

        // 2、用该实例执行校验
        schema.validate(
          {
            [field]: value
          },
          errors => {
            if (errors) {
              error[field] = { errors };
            }
          }
        );
      });

      return callback(JSON.stringify(error) === "{}" ? null : error, {
        ...this.state
      });
    };

    render() {
      return (
        <Comp
          {...this.props}
          getFieldDecorator={this.getFieldDecorator}
          getFieldsValue={this.getFieldsValue}
          getFieldValue={this.getFieldValue}
          validateFields={this.validateFields}
        />
      );
    }
  };
};

export default WFormCreate;
