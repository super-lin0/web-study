/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

import { def } from "../util/index";

/**
 * 修改数组的原型方法，使这些方法可以发送通知
 */

const arrayProto = Array.prototype;
// clone一份数组的原型，拥有数组的所有方法
export const arrayMethods = Object.create(arrayProto);

/**
 * 需要覆盖的7个方法
 */
const methodsToPatch = [
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "sort",
  "reverse"
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function(method) {
  // cache original method
  // 先保存原方法
  const original = arrayProto[method];
  // 假设method:push
  def(arrayMethods, method, function mutator(...args) {
    // 执行原始方法
    const result = original.apply(this, args);

    // 额外通知变更
    const ob = this.__ob__;
    let inserted;

    // 对于一些额外插入的新元素需要做响应化
    switch (method) {
      case "push":
      case "unshift":
        inserted = args;
        break;
      case "splice":
        inserted = args.slice(2);
        break;
    }
    if (inserted) ob.observeArray(inserted);

    // notify change
    // 此处通知，可以知道数组更新行为
    ob.dep.notify();
    return result;
  });
});
