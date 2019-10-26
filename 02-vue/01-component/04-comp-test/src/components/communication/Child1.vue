<template>
  <div class="child" @click="clickHandle">哥哥组件</div>
</template>

<script>
export default {
  methods: {
    clickHandle() {
      this.$parent.$emit("child1-click");
    }
  }
};
</script>

<style scoped>
.child {
  border: 2px solid red;
  margin: 10px;
  width: 300px;
  height: 300px;
}
</style>