import React from "react";

function List({ fruit, setFruit }) {
  const delFruit = index => {
    const tem = [...fruit];

    tem.splice(index, 1);

    setFruit(tem);
  };
  return (
    <div>
      <ul>
        {fruit.map((item, index) => (
          <li key={item} onClick={() => delFruit(index)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
