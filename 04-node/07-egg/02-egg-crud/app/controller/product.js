"use strict";

const Controller = require("egg").Controller;

class ProductController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      limit: ctx.helper.parseInt(ctx.query.limit),
      offset: ctx.helper.parseInt(ctx.query.offset)
    };

    ctx.body = await ctx.service.product.list(query);
  }

  async show() {
    const { ctx } = this;
    ctx.body = await ctx.service.product.find(
      ctx.helper.parseInt(ctx.params.id)
    );
  }

  async create() {
    const { ctx } = this;
    const product = await ctx.service.product.create(ctx.request.body);
    ctx.status = 200;
    ctx.body = product;
  }

  async update() {
    const { ctx } = this;
    const { body } = ctx.request;

    const id = ctx.helper.parseInt(ctx.params.id);

    ctx.body = await ctx.service.product.update({ id, updates: body });
  }

  async destroy() {
    const { ctx } = this;
    const id = ctx.helper.parseInt(ctx.params.id);

    await ctx.service.product.del(id);
    ctx.status = 200;
  }
}

module.exports = ProductController;
