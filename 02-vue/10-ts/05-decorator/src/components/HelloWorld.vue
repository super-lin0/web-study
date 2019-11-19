<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="button" value="submit" @click="onclick" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  // ！明确赋值断言，确定一定会有值
  // 装饰器里面的参数是给Vue的，所以String为大写，下面为小写
  @Prop({ type: String, required: true })
  private msg!: string;

  @Watch("msg")
  onMsgChange(val: string, oldVal: string) {
    // doSomthing
    alert(val);
  }

  // 通知父类新增事件，若未指定事件名则函数名作为事件名(羊肉串形式)
  @Emit()
  onclick(event: any) {
    // 返回值是自定义事件的参数
    this.msg = "Haha";
    return 1;
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
