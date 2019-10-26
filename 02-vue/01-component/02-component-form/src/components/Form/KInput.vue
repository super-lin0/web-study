<template>
  <div>
    <!-- input事件处理，值赋值 -->
    <!-- v-bind可理解为扩展运算符 -->
    <input :type="type" @input="onInput" :value="value" v-bind="$attrs" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false, // $attrs会将父组件的属性继承到根节点，这个属性则是去掉本组件根节点的$attrs
  props: {
    value: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      //转发input事件即可
      this.$emit("input", e.target.value);

      // 通知校验
      this.$parent.$emit("validate");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>