const { Controller } = require("egg");

/**
 * @Controller 用户鉴权
 */
class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 用户登录
   * @description 用户登录
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async login() {
    const { ctx, service } = this;

    // 校验参数
    ctx.validate(ctx.rule.loginRequest);

    // 组装参数
    const payload = ctx.request.body || {};

    // 调用service进行业务处理
    const res = await service.userAccess.login(payload);

    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 用户登出
   * @description 用户登出
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 创建成功
   */
  async logout() {
    const { ctx, service } = this;
    await service.userAccess.logout();

    ctx.helper.success({ ctx });
  }
}

module.exports = UserAccessController;
