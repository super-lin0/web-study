<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Tree></Tree>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Tree from '@/components/tree'
export default {
  name: 'home',
  components: {
    HelloWorld,Tree
  }
}
</script>
