<template>
  <div id="app">
    <Commnuication />
  </div>
</template>

<script>
import Commnuication from "@/components/communication/index.vue";

export default {
  name: "app",
  components: {
    Commnuication
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
