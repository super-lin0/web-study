import React, { Component } from "react";
import Schema from "async-validator";

const MyFormCreators = Comp => {
  return class WForm extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }

    getFieldsValue = () => {
      return this.state;
    };

    setChange = event => {
      event.preventDefault();
      this.setState({
        ...this.state,
        [event.target.name]: event.target.value
      });
    };

    getFieldDecorator = (field, options) => InputComp => {
      this.options[field] = options;
      return React.cloneElement(InputComp, {
        name: field,
        value: this.state[field] || "",
        onChange: this.setChange
      });
    };

    getFieldValue = name => this.state[name];

    validateFields = callback => {
      const error = {};
      Object.keys(this.options).forEach(key => {
        const rules = this.options[key].rules;
        const value = this.state[key];

        const schema = new Schema({
          [key]: rules
        });
        schema.validate({ [key]: value }, err => {
          if (err) {
            error[key] = {
              errors: err
            };
          }
        });
      });

      return callback(error, this.state);
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

export default MyFormCreators;
