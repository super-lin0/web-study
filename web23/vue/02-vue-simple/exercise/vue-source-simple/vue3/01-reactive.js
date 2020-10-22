// 数组响应式
// 替换数组原型中7个方法
const originalProto = Array.prototype;
// 备份,修改备份
const arrayProto = Object.create(originalProto);

["push", "pop", "shift", "unshift", "splice", "reverse", "sort"].forEach(
  (method) => {
    arrayProto[method] = function() {
      // 原始操作
      originalProto[method].apply(this, arguments);
      // 覆盖操作：通知更新
      console.log("数组执行", method, arguments);
    };
  }
);

// 数据响应式
function defineReactive(obj, key, val) {
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        // 保证如果newVal是对象，则再次做响应式处理
        observe(newVal);
        val = newVal;
      }
    },
  });
}

// 遍历obj，对其所有属性做响应式
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return;
  }

  // 判断传入obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型，替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部的元素执行响应化
    // const keys = Object.keys(obj);

    for (let i = 0; i < obj.length; i++) {
      const element = obj[i];
      observe(element);
    }
  } else {
    // 遍历obj所有key,做响应式处理
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
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

// obj.baz = {
//   a: 10,
// };

// obj.baz.a;

// set(obj, "dong", "dong");
// obj.dong;

// array
// push/pop/shift/unshift... 使用defineProperty拦截不到
//

obj.arr.push(4);

obj.arr;
