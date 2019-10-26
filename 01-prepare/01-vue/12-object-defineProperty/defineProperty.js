var data = {
  title: "zhangsan"
};

Object.defineProperty(data, "title", {
  get() {
    return "Hello";
  },
  set(newValue) {
    console.log(newValue);
  }
});

console.log(data.title);

data.title = "lisi";

console.log(data.title);
