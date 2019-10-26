<template>
  <div id="app">
    父组件
    <HelloWorld msg="Hello World" foo="hello foo" ref="hw" @myClick="onMyClick" />
    <HelloWorld2 msg="Hello World2" />
    <!-- 匿名插槽 -->
    <SlotScope>
      <!-- 默认插槽使用default做参数 -->
      <template v-slot:default>匿名插槽</template>
      <!-- 具名插槽使用插槽名做参数 -->
      <template v-slot:content>具名插槽</template>
      <!-- 作用域插槽：显示数据来自子组件 -->
      <template v-slot:content1="{foo}">作用域插槽{{foo}}</template>
    </SlotScope>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import HelloWorld2 from "./components/HelloWorld2";
import SlotScope from "./components/SlotScope";

export default {
  name: "app",
  provide() {
    // 祖先与后代之间通信
    return { foo: "foo" };
  },
  components: {
    HelloWorld,
    HelloWorld2,
    SlotScope
  },
  mounted() {
    this.$refs.hw.xx = "xxxxx";
    // 子组件实例的顺序是不保证的
    this.$children[0].oo = "ooooooo";
  },
  methods: {
    onMyClick() {
      alert("Hello Son");
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
  border: 5px solid red;
}
</style>
