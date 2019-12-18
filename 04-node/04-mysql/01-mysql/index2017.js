(async () => {
  const mysql = require("mysql2/promise");

  const cfg = {
    host: "localhost",
    user: "root",
    password: "123",
    database: "demo"
  };

  const connection = await mysql.createConnection(cfg);

  const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test(
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id))`;

  const INSERT_SQL = "INSERT INTO test(message) VALUES(?)";

  const SELECT_SQL = "select * from test";

  let ret = await connection.execute(CREATE_SQL);
  console.log("创建表格", ret);

  ret = await connection.execute(INSERT_SQL, ["abc"]);

  console.log("插入数据", ret);

  const [rows, fields] = await connection.execute(SELECT_SQL);

  console.log("select:", rows);
})();
