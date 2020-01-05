/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1578119235133_5376";

  // add your middleware config here
  config.middleware = ["errorHandler"];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.swaggerdoc = {
    dirScanner: "./app/controller",
    apiInfo: {
      title: "我的接口",
      description: "我的接口 swagger-ui for egg",
      version: "1.0.0"
    },
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    // enableValidate: true
    routerMap: true,
    enable: true
  };

  config.mongoose = {
    url: "mongodb://127.0.0.1:27017/test",
    options: {
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0
    }
  };

  config.jwt = {
    secret: "Great4-M",
    enable: true,
    match: /^\/api/
  };

  return {
    ...config,
    ...userConfig
  };
};
