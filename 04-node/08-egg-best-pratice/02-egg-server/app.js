/**
 * 全局定义
 */

class AppBootHook {
  constructor(app) {
    this.app = app;
    app.root_path = __dirname;
  }

  // 配置文件即将加载，这是最后动态修改配置的时机
  configWillLoad() {
    // Ready to call configDidLoad,
    // Config, plugin files are referred,
    // this is the last chance to modify the config.
  }

  // 配置文件加载完成;
  configDidLoad() {
    // Config, plugin files have been loaded.
  }

  // 文件加载完成
  async didLoad() {
    // All files have loaded, start plugin here.
  }

  // 插件启动完毕
  async willReady() {
    // All plugins have started, can do some thing before app ready
  }
  // worker 准备就绪
  async didReady() {
    // Worker is ready, can do some things
    // don't need to block the app boot.
    console.log("========Init Data Start===========");
    const ctx = await this.app.createAnonymousContext();
    await ctx.model.User.remove();
    await ctx.service.user.create({
      mobile: "13107453123",
      password: "11111",
      realName: "老王"
    });
    console.log("========Init Data End===========");
  }

  // 应用启动完成
  async serverDidReady() {
    // Server is listening.
  }

  // 应用即将关闭
  async beforeClose() {
    // Do some thing before app close.
  }
}

module.exports = AppBootHook;
