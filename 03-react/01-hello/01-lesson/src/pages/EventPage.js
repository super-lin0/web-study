import React, { Component } from "react";

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  submit = () => {
    this.props.tell(this.state.name);
    console.log("name", this.state.name);
  };

  change = event => this.setState({ name: event.target.value });

  render() {
    const { name } = this.state;
    return (
      <div>
        <h3>Event page</h3>
        <input value={name} onChange={this.change} />
        <button onClick={this.submit}>提交</button>
      </div>
    );
  }
}

export default EventPage;
