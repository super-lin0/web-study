import React, { Component } from "react";
import ReactDom from "react-dom";

class MyModal extends Component {
  constructor(props) {
    super(props);
    const doc = window.document;
    this.node = doc.createElement("div");
    doc.body.appendChild(this.node);
  }

  componentWillUnmount() {
    window.document.body.removeChild(this.node);
  }

  render() {
    return ReactDom.createPortal(
      <div
        style={{
          border: "1px solid red",
          width: "100px",
          height: "100px",
          textAlign: "center"
        }}
      >
        Hello
      </div>,
      this.node
    );
  }
}

export default MyModal;
