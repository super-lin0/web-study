<template>
  <div class="parent-to-child">
    <p>父组件=> 子组件通信</p>

    <p>方法一：props</p>
    <div>{{msg}}</div>

    <p>方法二：$attrs</p>
    <div>{{$attrs.foo}}</div>

    <p>方法三：refs</p>
    <div>{{xx}}</div>

    <p>方法四: $children</p>
    <div>{{oo}}</div>
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      xx: "value",
      oo: "ooo"
    };
  }
};
</script>

<style  scoped>
.parent-to-child {
  border: 2px solid blue;
  margin: 10px;
}
</style>