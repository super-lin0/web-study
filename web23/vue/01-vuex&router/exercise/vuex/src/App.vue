<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

    <h3>counter:{{ this.$store.state.count }}</h3>
    <h3>double: {{ this.$store.getters.doubleCount }}</h3>
    <button @click="onAddClick">+</button>
    <button @click="onAddAsyncClick">async +</button>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
  },
  methods: {
    onAddClick() {
      this.$store.commit("add");
    },
    onAddAsyncClick() {
      this.$store.dispatch("add");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
