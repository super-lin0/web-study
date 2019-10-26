<template>
  <div class="bus" @click="clickHandle">Bus1</div>
</template>

<script>
export default {
  methods: {
    clickHandle() {
      this.$bus.$emit("bus-click");
    }
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