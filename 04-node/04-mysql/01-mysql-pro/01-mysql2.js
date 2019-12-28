(async () => {
  const mysql = require("mysql2/promise");

  //连接配置
  const cfg = {
    host: "localhost",
    user: "root",
    password: "123",
    database: "demo"
  };

  const connection = await mysql.createConnection(cfg);

  let ret = await connection.execute(`create table if not exists test (
    id int not null auto_increment,
    message varchar(45) null,
    primary key (id)
  )`);

  console.log("create ", ret);

  ret = await connection.execute(`insert into test(message) values(?)`, [
    "abc"
  ]);

  console.log("insert", ret);

  const [rows, fields] = await connection.execute(`select * from test`);
  console.log("select", JSON.stringify(rows));
})();
