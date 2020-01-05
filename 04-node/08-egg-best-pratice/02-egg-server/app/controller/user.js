const { Controller } = require("egg");

/**
 * @Controller 用户管理
 */
class UserController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 创建用户
   * @description 创建用户，记录用户账号/密码/类型
   * @router post /api/user
   * @request body createUserRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;

    // 校验参数
    ctx.validate(ctx.rule.createUserRequest);

    const payload = ctx.request.body || {};

    const res = ctx.service.user.create(payload);

    ctx.helper.success({ ctx, res });
  }
  /**
   * @summary 删除用户
   * @description 删除用户
   * @router delete /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 创建成功
   */
  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    await service.user.destroy(id);
    ctx.helper.success({ ctx });
  }

  /**
   * @summary 更新用户
   * @description 修改用户信息
   * @router put /api/user/{id}
   * @request path string *id eg: 1 用户ID
   * @request body createUserRequest * body
   * @response 200 baseResponse 修改成功
   */
  async update() {
    const { ctx, service } = this;
    ctx.validate(ctx.rule.createUserRequest);

    console.log("ctx params", ctx.params);

    const { id } = ctx.params;

    const payload = ctx.request.body || {};

    await service.user.update(id, payload);

    ctx.helper.success({ ctx });
  }

  /**
   * @summary 根据id查询用户
   * @description 根据id查询用户
   * @router get /api/user/{id}
   * @request path string *id eg:1 用户ID
   * @response 200 baseResponse 查询成功
   */
  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const res = await service.user.show(id);
    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 分页查询用户
   * @description 分页查询用户信息
   * @router get /api/user/
   * @request query integer limit eg:10 单页数量
   * @reuqest query integer offset eg: 1 当前页
   * @response 200 baseResponse 查询成功
   */
  async index() {
    const { ctx, service } = this;

    const payload = ctx.query;

    const res = await service.user.index(payload);
    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
