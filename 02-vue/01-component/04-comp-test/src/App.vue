<template>
  <div id="app">
    <!-- 组件通信 -->
    <!-- <Commnuication /> -->
    <!-- 插槽 -->
    <!-- <slots /> -->
    <el-form></el-form>
  </div>
</template>

<script>
// import Commnuication from "@/components/communication/index.vue";
// import Slots from "@/components/slots/index.vue";
import ElForm from "@/components/ElForm";

export default {
  name: "app",
  components: {
    // Commnuication,
    // Slots
    ElForm
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
