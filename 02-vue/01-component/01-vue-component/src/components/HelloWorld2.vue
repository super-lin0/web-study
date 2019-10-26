<template>
  <div class="hi2" @click="sayHi">
    子组件2
    <p>{{msg}}</p>
    <p>{{foo}}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld2",
  inject: ["foo"],
  props: {
    msg: String
  },
  methods: {
    sayHi() {
      this.$parent.$emit("foo");
    }
  }
};
</script>

<style scoped>
.hi2 {
  border: 1px solid black;
  margin: 10px 10px;
}
</style>