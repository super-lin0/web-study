<template>
  <div class="bus">Bus2</div>
</template>

<script>
export default {
  created() {
    this.$bus.$on("bus-click", () => alert("来自bus2的一声吼：你吼啊"));
  }
};
</script>

<style  scoped>
.bus {
  border: 5px solid #f00;
  margin: 10px;
  width: 100px;
  height: 100px;
}
</style>