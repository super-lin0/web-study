import React, { Component } from "react";
import Schema from "async-validator";

const WFormCreate = Comp => {
  return class WForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        reducer: {},
        errors: {}
      };
      this.options = {};
    }

    setChange = event => {
      const { name, value } = event.target;
      this.setState({
        reducer: {
          ...this.state.reducer,
          [name]: value
        }
      });

      this._validate(name, value);
    };

    _validate = (field, value) => {
      const rules = this.options[field].rules;
      let stateErr = "";

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
            stateErr = errors[0].message;
          } else {
            stateErr = "";
          }
        }
      );

      this.setState({
        errors: {
          ...this.state.errors,
          [field]: stateErr
        }
      });
    };

    getFieldDecorator = (field, options) => InputCmp => {
      this.options[field] = options;
      return (
        <>
          {React.cloneElement(InputCmp, {
            name: field,
            value: this.state.reducer[field] || "",
            onChange: this.setChange
          })}
          {this.state.errors[field] && (
            <span style={{ color: "red" }}>{this.state.errors[field]}</span>
          )}
        </>
      );
    };

    getFieldsValue = () => {
      return this.state.reducer;
    };

    getFieldValue = name => {
      return this.state.reducer[name];
    };

    validateFields = callback => {
      const error = {};
      const stateErr = {};
      Object.keys(this.options).forEach(field => {
        const rules = this.options[field].rules;
        const value = this.state.reducer[field];

        const schema = new Schema({
          [field]: rules
        });

        // 2、用该实例执行校验
        schema.validate(
          {
            [field]: value
          },
          err => {
            if (err) {
              error[field] = { errors: err };
              stateErr[field] = err[0].message;
            }
          }
        );
      });

      this.setState({
        errors: {
          ...this.state.errors,
          ...stateErr
        }
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
