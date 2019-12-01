import React, { Component } from "react";
import { createPortal } from "react-dom";

class MModal extends Component {
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
    return createPortal(<div className="modal">MyModal</div>, this.node);
  }
}

export default MModal;
