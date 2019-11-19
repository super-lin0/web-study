<template>
  <div class="hello">{{ msg }}</div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";

// Component任务
function Component(options: any) {
  // 如果要扩展装饰器可传参，多嵌套一层，返回的才是装饰器函数
  return function(target: any) {
    return Vue.extend(options);
  };
}

@Component({
  props: {
    msg: {
      type: String,
      default: ""
    }
  }
})
export default class Decorator extends Vue {}
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
