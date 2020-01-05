const { Service } = require("egg");

class UserService extends Service {
  /**
   * 查询用户列表
   * @param {*} payload
   */
  async index({ offset = 1, limit = 10 }) {
    const { ctx } = this;
    let skip = (Number(offset) - 1) * Number(limit || 10);

    return await this.ctx.model.User.find({})
      .populate("role")
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 })
      .exec();
  }

  /**
   * 根据ID查询用户
   * @param {*} _id
   */
  async show(_id) {
    const user = await this.ctx.service.user.find(_id);

    if (!user) {
      this.ctx.throw(404, "user not found");
    }

    return this.ctx.model.User.findById(_id);
  }

  /**
   * 根据id删除用户
   * @param {*} _id
   */
  async destroy(_id) {
    const user = await this.ctx.service.user.find(_id);

    if (!user) {
      this.ctx.throw(404, "user not found");
    }

    return this.ctx.model.User.findByIdAndRemove(_id);
  }

  /**
   * 修改用户信息
   * @param {*} id
   * @param {*} payload
   */
  async update(id, payload) {
    const { ctx } = this;
    const user = await ctx.service.user.find(id);

    if (!user) {
      this.ctx.throw(404, "user not found");
    }

    return this.ctx.model.User.findByIdAndUpdate(id, payload);
  }

  /**
   * 创建用户
   * @param {*} payload
   */
  async create(payload) {
    const { ctx } = this;
    payload.password = await ctx.genHash(payload.password);

    return ctx.model.User.create(payload);
  }

  /**
   * 查找用户
   * @param {*} id
   */
  async find(id) {
    return this.ctx.model.User.findById(id);
  }
}
module.exports = UserService;
