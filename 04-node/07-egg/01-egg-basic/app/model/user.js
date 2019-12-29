"use strict";

module.exports = app => {
  const { STRING } = app.Sequelize;

  const User = app.model.define(
    "user",
    { name: STRING(30) },
    { timestamp: false }
  );

  // User.sync({ force: true });

  return User;
};
