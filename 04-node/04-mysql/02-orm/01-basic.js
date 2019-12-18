(async () => {
  const Sequelize = require("sequelize");

  // 建立连接
  const sequelize = new Sequelize("demo", "root", "123", {
    host: "localhost",
    dialect: "mysql"
  });

  // 定义模型
  const Fruit = sequelize.define(
    "fruit",
    {
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        get() {
          const fname = this.getDataValue("name");
          const price = this.getDataValue("price");
          const stock = this.getDataValue("stock");

          return `${fname}(价格：Y${price} 库存：${stock}kg)`;
        }
      },
      price: { type: Sequelize.FLOAT, allowNull: false },
      stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    },
    {
      timestamps: false // 避免自动生成时间戳字段
    }
  );

  // 同步数据库，force:true则会删除已存在表
  let ret = await Fruit.sync();

  console.log("==============");
  console.log("sync", JSON.stringify(ret));

  ret = await Fruit.create({
    name: "香蕉",
    price: 3.5
  });

  console.log("==============");
  console.log("插入数据;ret", JSON.stringify(ret));

  ret = await Fruit.findAll();

  console.log("==============");
  console.log("查找数据:ret", JSON.stringify(ret));

  await Fruit.update({ price: 4 }, { where: { id: 1 } });

  console.log("==============");
  console.log("修改后findAll", JSON.stringify(ret));

  const Op = Sequelize.Op;

  ret = await Fruit.findAll({
    where: { price: { [Op.lt]: 4, [Op.gt]: 2 } }
  });

  console.log("findAll", JSON.stringify(ret, "", "\t"));
})();
