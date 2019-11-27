import React from "react";

function FruitList({ fruits = [], setFruits }) {
  const del = index => {
    const tmp = [...fruits];
    tmp.splice(index, 1);
    setFruits(tmp);
  };

  return (
    <div>
      <ul>
        {fruits.map((item, index) => (
          <li key={index} onClick={() => del(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FruitList;
