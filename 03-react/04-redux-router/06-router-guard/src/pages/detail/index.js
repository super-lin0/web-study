import React from "react";

function Detail(props) {
  console.log("detail", props);

  return (
    <div>
      <h3>Details id: {props.match.params.id}</h3>
    </div>
  );
}

export default Detail;
