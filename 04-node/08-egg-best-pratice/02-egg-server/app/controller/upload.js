const fs = require("fs");
const path = require("path");
const awaitWriteStream = require("await-stream-ready").write;
const sendToWormhole = require("stream-wormhole");
const download = require("image-downloader");
const { Controller } = require("egg");

/**
 * @controller 文件上传
 */
class UploadController extends Controller {
  constructor(ctx) {
    super(ctx);
  }

  /**
   * @summary 单个文件上传
   * @description 单个文件上传
   * @router post /api/upload/single
   */
  async create() {
    const { ctx } = this;

    const stream = await ctx.getFileStream();
    const filename = path.basename(stream.filename);
    const extname = path.extname(stream.filename).toLocaleLowerCase();
    const uuid = (Math.random() * 99999).toFixed();

    const target = path.join(
      this.config.baseDir,
      "app/public/uploads",
      `${uuid}${extname}`
    );
    const writeStream = fs.createWriteStream(target);

    try {
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      await sendToWormhole(stream);
      throw err;
    }
    ctx.helper.success({ ctx });
  }
}

module.exports = UploadController;
