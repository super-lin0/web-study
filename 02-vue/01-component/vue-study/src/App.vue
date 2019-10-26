<template>
  <div id="app">

    <!-- form测试 -->
    <form-test></form-test>

    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld>      
      <template>abc</template> -->
      <!-- 作用域插槽：显示数据来自子组件 -->
      <!-- <template v-slot:content="{foo}">content...{{foo}}</template>
    </HelloWorld>
    <HelloWorld msg="Welcome to Your Vue.js App" 
      foo="foo" ref="hw" @myclick="onMyClick"/> -->
    
    <!-- 组件通信 -->
    <!-- <Communicate></Communicate> -->
    <!-- 插槽 -->
    <!-- <SlotTest></SlotTest> -->
    <!-- 递归 -->
    <!-- <Recursion></Recursion> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Communicate from "@/components/communicate";
import SlotTest from "@/components/slots";
import Recursion from "@/components/recursion";
import FormTest from '@/components/form'

export default {
  name: "app",
  provide(){
    return {
      foo: 'foo'
    }
  },
  components: {
    HelloWorld,
    Communicate,
    SlotTest,
    Recursion,
    FormTest
  },
  mounted() {
    // this.$refs.hw.xx = 'xxxxxx'
    // 子组件实例的顺序不保证的
    // this.$children[0].xx = 'oo'
  },
  methods: {
    onMyClick() {
      console.log('myclick');
      
    }
  },
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
