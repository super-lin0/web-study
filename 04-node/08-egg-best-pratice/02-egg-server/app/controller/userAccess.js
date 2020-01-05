const { Controller } = require("egg");

/**
 * @controller 用户鉴权
 */
class UserAccessController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 登录
   * @description 登录
   * @router post /auth/jwt/login
   * @request body loginRequest *body
   * @response 200 baseResponse 登录成功
   */
  async login() {
    const { ctx, service } = this;

    ctx.validate(ctx.rule.loginRequest);

    const payload = ctx.request.body || {};
    const res = await service.userAccess.login(payload);

    ctx.helper.success({ ctx, res });
  }

  /**
   * @summary 登出
   * @description 登出
   * @router post /auth/jwt/logout
   * @request body loginRequest *body
   * @response 200 baseResponse 登出
   */
  async logout() {
    const { ctx, service } = this;
    await service.userAccess.logout();

    ctx.helper.success({ ctx });
  }
}

module.exports = UserAccessController;
