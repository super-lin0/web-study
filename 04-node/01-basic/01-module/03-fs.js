const fs = require("fs");

// 同步调用
const data = fs.readFileSync("./package.json");

console.log("data", data, data.toString());

// 异步调用
fs.readFile("./package.json", (err, data) => {
  console.log("data readFile", data.toString());
});
