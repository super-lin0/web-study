<template>
  <!-- 子组件向父组件通信：自定义事件，Note：事件谁派发谁监听 -->
  <div class="hello" @click="$emit('myClick')">
    子组件1
    <h1>{{ msg }}</h1>
    <!-- $attrs -->
    <p>{{$attrs.foo}}</p>
    <!-- $refs -->
    <p>{{xx}}</p>
    <!-- $children -->
    <p>{{oo}}</p>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      xx: "xx",
      oo: "oo"
    };
  },
  created() {
    this.$parent.$on("foo", () => {
      alert("Hi, brother, I'm from Hello World");
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin: 10px 10px;
  border: 1px solid red;
}
</style>
