<template>
  <div>
    <h2>作用域插槽</h2>
    <slot :msg="msg"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "来自作用域插槽"
    };
  }
};
</script>

<style lang="scss" scoped>
</style>