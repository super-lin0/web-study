<template>
  <div id="app">
    <store-test />
  </div>
</template>

<script>
import StoreTest from "./components/Store.vue";

export default {
  name: "app",
  components: {
    StoreTest
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
