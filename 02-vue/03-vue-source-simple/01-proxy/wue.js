class Wue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;

    this.observe(this.$data);
  }

  observe(obj) {
    if (!obj || typeof obj !== "object") return;

    Object.keys(obj).forEach(key => {
      this.defineReactive(obj, key, obj[key]);
      this.proxyData(key);
    });
  }

  defineReactive(obj, key, val) {
    // 递归操作:防止data中包含对象
    this.observe(val);
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        if (val === newVal) {
          return;
        }
        val = newVal;
        console.log(`Wue: set: ${key}更新了`);
      }
    });
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key];
      },
      set(newVal) {
        this.$data[key] = newVal;
        console.log(`Wue: proxy: ${key}更新了`);
      }
    });
  }
}
