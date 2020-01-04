"use strict";

module.exports = {
  createUserRequest: {
    mobile: {
      type: "string",
      required: true,
      description: "手机号",
      example: "18181818181",
      format: /^1[34578]\d{9}$/
    },
    password: {
      type: "string",
      required: true,
      description: "密码",
      example: "1111"
    },
    realName: {
      type: "string",
      required: true,
      description: "姓名",
      example: "张三"
    }
  }
};
