import React, { Component } from "react";

class Layout extends Component {
  componentDidMount() {
    const { title = "商城" } = this.props;
    document.title = title;
  }

  render() {
    console.log("this.props:", this.props);
    const { showTopBar, children } = this.props;

    return (
      <div className="border">
        {showTopBar && <h3>Layout</h3>}
        {children.btn}
        {children.txt}
      </div>
    );
  }
}

export default Layout;
