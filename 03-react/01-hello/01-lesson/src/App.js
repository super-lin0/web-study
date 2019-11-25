import React from "react";
// import ClassComponentPage from "./pages/ClassComponentPage";
// import FunctionComponentPage from "./pages/FunctionComponentPage";
// import EventPage from "./pages/EventPage";
import Lifecycle from "./pages/Lifecycle-16.8";

// function tell(params) {
//   console.log("parent:", params);
// }

function App() {
  return (
    <div className="App">
      <p>hello world</p>
      {/* <ClassComponentPage /> */}
      {/* <FunctionComponentPage /> */}
      {/* <EventPage tell={tell} /> */}
      <Lifecycle />
    </div>
  );
}

export default App;
