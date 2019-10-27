<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  provide() {
    return { form: this }; //  将组件实例作为提供者，方便子组件获取
  },
  props: {
    rules: {
      type: Object
    },
    value: { type: Object, required: true }
  },
  methods: {
    validate(cb) {
      // 调用FormItem的校验方法，只要有一个失败就失败
      const validates = this.$children
        .filter(item => item.name)
        .map(item => item.validate());

      Promise.all(validates)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  }
};
</script>

<style lang="scss" scoped>
</style>