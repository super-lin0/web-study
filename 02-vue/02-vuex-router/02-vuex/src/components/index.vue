<template>
  <div>
    <h3>Hello Vuex</h3>
    <p>{{$store.state.count}}</p>

    <button @click="increment">+</button>
    <button @click="incrementAsync">+ delay</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
export default {
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
    incrementAsync() {
      this.$store.dispatch("incrementAsync");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>