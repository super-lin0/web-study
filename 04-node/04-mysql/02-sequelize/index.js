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

  ret = await Fruit.create({ name: "香蕉", price: 3.5 });

  console.log("create", ret);

  ret = await Fruit.findAll();

  console.log("find", JSON.stringify(ret));

  await Fruit.update({ price: 3.5 }, { where: { id: 1 } });

  const Op = Sequelize.Op;

  ret = await Fruit.findAll({
    where: { price: { [Op.lt]: 5, [Op.gt]: 2 } }
  });

  console.log("find", JSON.stringify(ret));
})();
