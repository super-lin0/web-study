<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{ $store.state.count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="decrementAsync">delay -</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    increment() {
      this.$store.commit("increment");
    },
    decrement() {
      this.$store.commit("decrement");
    },
    decrementAsync() {
      this.$store.dispatch("decrementAsync");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
