"use strict";

const { Service } = require("egg");

class ProductService extends Service {
  async list({ offset = 0, limit = 10 }) {
    return this.ctx.model.Product.findAndCountAll({
      offset,
      limit,
      order: [
        ["created_at", "desc"],
        ["id", "desc"]
      ]
    });
  }

  async find(id) {
    const product = await this.ctx.model.Product.findByPk(id);

    if (!product) {
      this.ctx.throw(404, "product not found");
    }

    return product;
  }

  async create(product) {
    return this.ctx.model.Product.create(product);
  }

  async update({ id, updates }) {
    const product = await this.ctx.model.Product.findByPk(id);

    if (!product) {
      this.ctx.throw(404, "product not found");
    }

    return product.update(updates);
  }

  async del(id) {
    const product = await this.ctx.model.Product.findByPk(id);
    if (!product) {
      this.ctx.throw(404, "product not found");
    }

    return product.destroy();
  }
}

module.exports = ProductService;
