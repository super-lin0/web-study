import React from "./react";
// import React from "react";
import ReactDOM from "./react/react-dom";
// import ReactDOM from "react-dom";
import "./index.css";

const jsx = (
  <div className="box">
    <div className="border">我是文本</div>
  </div>
);
ReactDOM.render(jsx, document.getElementById("root"));
