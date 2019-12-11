import React from "react";

export function add(params) {
  return params;
}

const JestPage = props => {
  if (props.name) {
    return <h1>你好，{props.name}！</h1>;
  } else {
    return <span>嘿，陌生人</span>;
  }
};

export default JestPage;
