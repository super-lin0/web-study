module.exports = {
  db: {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123",
    database: "demo"
  },
  middlewares: ["logger"]
};