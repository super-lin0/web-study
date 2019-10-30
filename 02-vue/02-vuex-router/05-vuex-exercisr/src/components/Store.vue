<template>
  <div class="hello">
    <h1>{{$store.state.count}}</h1>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="delaycrement">delay +</button>
    <h1>{{$store.getters.doneTodos}}</h1>
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
    delaycrement() {
      this.$store.dispatch("delaycrement");
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
