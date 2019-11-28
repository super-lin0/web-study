import React, { useState } from "react";
import { Button } from "antd";
import MyModal from "../components/MyModal";
import MyModalFunc from "../components/MyModalFunc";

const HomePage = () => {
  const [visible, setVisible] = useState(false);

  const toggle = () => {
    setVisible(!visible);
    console.log("toggle:", visible);
  };

  return (
    <div>
      <Button onClick={toggle}>toggle</Button>
      {visible && <MyModalFunc onClose={() => toggle()} />}
      {/* {visible && <MyModal />} */}
    </div>
  );
};

export default HomePage;
