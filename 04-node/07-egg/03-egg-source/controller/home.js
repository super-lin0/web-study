module.exports = app => ({
  index: async ctx => {
    // ctx.body = "首页CTRL";
    const name = await app.$service.user.getName();
    app.ctx.body = "ctrl user" + name;
  },
  detail: async ctx => {
    // ctx.body = "详细页CTRL";
    app.ctx.body = "详细页CTRL";
  }
});
