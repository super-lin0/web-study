const mysql = require("mysql");

const cfg = {
  host: "localhost",
  user: "root",
  password: "123", // 修改为你的密码
  database: "demo" // 请确保数据库存在
};

const conn = mysql.createConnection(cfg);

conn.connect(err => {
  if (err) {
    throw err;
  } else {
    console.log("连接成功");
  }
});

const SELECT_SQL = "select * from test_grafana";

conn.query(SELECT_SQL, (err, results) => {
  console.log(results);
  conn.end();
});
