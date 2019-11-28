import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import { Button } from "antd";

const MyModalFunc = ({ onClose }) => {
  const [node, setNode] = useState(window.document.createElement("div"));

  useEffect(() => {
    window.document.body.appendChild(node);

    return remove;
  }, []);

  const remove = () => {
    if (window.document.body.contains(node)) {
      window.document.body.removeChild(node);
      onClose();
    }
  };

  return ReactDom.createPortal(
    <>
      <div className="mask" />
      <div className="dialog">
        Hello
        <Button onClick={remove}>移除</Button>
      </div>
    </>,
    node
  );
};

export default MyModalFunc;
