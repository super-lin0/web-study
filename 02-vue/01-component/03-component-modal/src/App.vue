<template>
  <div id="app">
    <button @click="send">弹出</button>
  </div>
</template>

<script>
import Notice from "./components/Notice.vue";

export default {
  name: "app",
  methods: {
    send() {
      this.$create(Notice, {
        title: "错误提示",
        message: "输入错误",
        duration: 2000
      }).show();
    }
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
