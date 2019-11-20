<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="button" value="点击" @click="onClick" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Notice from "@/components/Notice.vue";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  onClick() {
    this.$create(Notice, {
      title: "提示信息",
      message: "删除成功",
      duration: 1000
    }).show();
  }
}
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
