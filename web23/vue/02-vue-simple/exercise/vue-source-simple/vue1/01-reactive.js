// 数据响应式
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
        // 保证如果newVal是对象，再次做响应式处理
        observe(newVal);
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

  // 遍历obj所有key，做响应式处理
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key]);
  });
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
};

observe(obj);

// obj.baz = {

//   a: 10,
// };

// obj.baz.a;
// obj.baz.a = 10;

// obj.dong = 10;
// obj.dong;
set(obj, "dong", "dong");
obj.dong;
