const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.send(`
    <html>
      <body>
        <div id="app">
          <h1>Hello, Worlds</h1>
          <p class="demo">你好，世界</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log("服务器启动成功");
});
