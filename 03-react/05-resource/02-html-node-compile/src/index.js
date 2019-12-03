// import React from "react";
import React from "./react";
// import ReactDOM from "react-dom";
import ReactDOM from "./react/ReactDOM";
import "./index.css";

const jsx = (
  <div className="box">
    <div className="border">文本节点</div>
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
