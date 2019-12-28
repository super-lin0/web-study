(async () => {
  const Sequelize = require("sequelize");

  // 建立连接
  const sequelize = new Sequelize("demo", "root", "123", {
    host: "localhost",
    dialect: "mysql",
    operatorsAliases: false
  });

  // 定义模型
  const Fruit = sequelize.define("fruit", {
    name: { type: Sequelize.STRING(20), allowNull: false },
    price: { type: Sequelize.FLOAT, allowNull: false },
    stock: { type: Sequelize.INTEGER, defaultValue: 0 }
  });

  let ret = await Fruit.sync();
  console.log("sync", ret);
})();
