<template>
  <div id="app">
    <button @click="clickHandle">提交</button>
  </div>
</template>

<script>
import Notice from "@/components/Notice.vue";

export default {
  name: "app",
  methods: {
    clickHandle() {
      this.$create(Notice, {
        title: "提示",
        content: "确认提交",
        duration: 3000
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
