<template>
  <div class="child">弟弟组件</div>
</template>

<script>
export default {
  created() {
    this.$parent.$on("child1-click", () => {
      alert("来自弟弟的一声吼：干哈呀");
    });
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