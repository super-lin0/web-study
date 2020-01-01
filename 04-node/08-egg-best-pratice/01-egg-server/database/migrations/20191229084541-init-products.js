"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const { INTEGER, DATE, STRING, FLOAT } = Sequelize;
    await queryInterface.createTable("products", {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      product_name: STRING(35),
      price: FLOAT,
      created_at: DATE,
      updated_at: DATE
    });
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable("products");
  }
};
