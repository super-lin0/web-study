// 数组响应式
// 1、替换数组原型中7个方法
const originalProto = Array.prototype;
// 备份，修改备份
const arrayProto = Object.create(originalProto);

["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function() {
    // 原始操作
    originalProto[method].apply(this, arguments);
    // 覆盖:通知更新
    console.log("数组执行", method, "操作");
  };
});

// 对象响应式
function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      console.log("set", key);
      if (newVal !== val) {
        val = newVal;
      }
    },
  });
}

// 遍历obj,对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;

    // 对数组内部的元素执行响应化
    const keys = Object.keys(obj);

    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

const obj = {
  foo: "foo",
  bar: "bar",

  baz: {
    a: 1,
  },

  arr: [1, 2, 3],
};

observe(obj);

obj.baz.a;

obj.arr.push(4);
