import React, { useState, useEffect, useContext } from "react";
import { Context } from "../AppContext";

export function UseContextPage(props) {
  const ctx = useContext(Context);
  return (
    <div>
      <h3>UseContextPage</h3>
      <p>{ctx.user.name}</p>
    </div>
  );
}
