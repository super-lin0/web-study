"use strict";
module.exports = app => {
  const { INTEGER, DATE, STRING, FLOAT } = app.Sequelize;

  const Product = app.model.define("products", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    product_name: STRING(35),
    price: FLOAT,
    created_at: DATE,
    updated_at: DATE
  });

  return Product;
};
