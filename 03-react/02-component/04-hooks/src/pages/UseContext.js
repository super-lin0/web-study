import React, { useContext } from "react";
import { Context } from "../AppContext";

function UseContext(props) {
  const ctx = useContext(Context);
  return (
    <div>
      <h3>UseContext</h3>
      {ctx.user.name}
    </div>
  );
}

export default UseContext;
