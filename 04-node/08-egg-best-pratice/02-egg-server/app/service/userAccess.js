const { Service } = require("egg");

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;

    const user = await service.user.findByMobile(payload.mobile);
    if (!user) {
      ctx.throw(404, "user not found");
    }
    let verifyPsw = await ctx.compare(payload.password, user.password);
    if (!verifyPsw) {
      ctx.thow(404, "user password is error");
    }

    console.log("login: user: ", user);

    return { token: await service.actionToken.apply(user._id) };
  }

  async current() {
    const { ctx, service } = this;
    const _id = ctx.state.user.data._id;
    const user = await service.user.find(_id);
    if (!user) {
      ctx.thow(404, "user is not found");
    }
    user.password = "How old are you";
    return user;
  }

  async logout() {}
}
module.exports = UserAccessService;
