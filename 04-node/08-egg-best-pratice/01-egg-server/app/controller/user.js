"use strict";

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
   * @request body createUserRequest * body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx } = this;

    //  参数校验
    ctx.validate(ctx.rule.createUserRequest);

    // 组装参数
    const payload = ctx.request.body || {};

    // 执行调用
    const res = await ctx.service.user.create(payload);

    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserController;
