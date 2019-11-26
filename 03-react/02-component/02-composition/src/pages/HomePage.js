import React, { Component } from "react";
import Layout from "./Layout";

class HomePage extends Component {
  render() {
    return (
      <Layout showTopBar={true} title="首页">
        {/* 匿名插槽 */}
        {/* <div>
          <h3>HomePage</h3>
        </div> */}
        {/* 具名插槽 */}
        {{
          btn: <button>提交</button>,
          txt: "内容"
        }}
      </Layout>
    );
  }
}

export default HomePage;
