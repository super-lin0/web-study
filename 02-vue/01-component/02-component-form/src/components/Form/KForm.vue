<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    // this 指的是表单组件的实例
    return { form: this };
  },
  props: {
    model: {
      type: Object,
      required: true
    },
    rules: {
      type: Object
    }
  },
  methods: {
    validate(cb) {
      //调用所有的FormItem的Validate，只要又一个失败就失败
      // 结果是Promise数组
      const tasks = this.$children
        .filter(item => !!item.prop) //留下带prop属性的，排除例如button
        .map(item => item.validate());

      // 判断所有 的结果
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>