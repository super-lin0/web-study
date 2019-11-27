import React from "react";
import "./App.css";
import Fruits from "./pages/fruits";
import FruitsReducer from "./pages/fruitReducer";

function App() {
  return (
    <div className="App">
      {/* <Fruits /> */}
      <FruitsReducer />
    </div>
  );
}

export default App;
