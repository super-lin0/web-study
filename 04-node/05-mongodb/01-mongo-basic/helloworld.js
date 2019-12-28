(async () => {
  const { MongoClient: MongoDB } = require("mongodb");

  // 创建客户端
  const client = new MongoDB("mongodb://localhost:27017", {
    useNewUrlParser: true
  });

  // 创建连接
  let ret;

  ret = await client.connect();

  // console.log("connection", ret);

  const db = client.db("test");

  // 添加文档
  const fruits = db.collection("fruits");
  ret = await fruits.insertOne({ name: "香蕉", price: 3.5 });

  // console.log("插入成功", JSON.stringify(ret));

  // 查询
  ret = await fruits.findOne();
  console.log("查询", JSON.stringify(ret));

  ret = await fruits.find().toArray();
  console.log("查询", JSON.stringify(ret));

  // 更新
  ret = await fruits.updateOne(
    { name: "香蕉" },
    {
      $set: { name: "栗子" }
    }
  );

  ret = await fruits.deleteOne({ name: "栗子" });

  // 删除全部
  // await fruits.deleteMany();
  client.close();
})();
