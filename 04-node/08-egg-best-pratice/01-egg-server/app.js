/**
 * 全局定义
 */
class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  configwillLoad() {}

  configDidLoad() {}

  async didLoad() {}

  async willReady() {}

  async didReady() {
    console.log("=======Init Data===========");

    const ctx = await this.app.createAnonymousContext();
    await ctx.model.User.remove();

    await ctx.service.user.create({
      mobile: "13579796767",
      password: "1111",
      realName: "张三"
    });
  }

  async beforeClose() {}
}

module.exports = AppBootHook;
