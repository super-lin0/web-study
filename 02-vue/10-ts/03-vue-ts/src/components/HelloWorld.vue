<template>
  <div class="hello">
    <h1>Hello TypeScript</h1>
    <div>
      <input type="text" placeholder="请输入特性" @keyup.enter="addFeature" />
    </div>
    <ul>
      <li v-for="feature in features" :key="feature.id">
        {{feature.name}}
        <span class="tag">{{feature.version}}</span>
      </li>
      <li>特性总数：{{total}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Feature from "@/models/feature";

@Component
export default class HelloWorld extends Vue {
  // 声明属性就会作为data
  private features: Feature[] = [{ id: 1, name: "类型注解", version: "1.0" }];

  get total() {
    return this.features.length;
  }

  // 方法可以直接作为事件的回调函数
  addFeature(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    this.features.push({
      id: this.features.length + 1,
      name: input.value,
      version: "1.0"
    });
    input.value = "";
  }

  // 生命周期钩子
  mounted() {
    // 获取数据
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
  /* display: inline-block; */
  margin: 20px 10px;
}
.tag {
  background-color: rgb(30, 151, 199);
  color: white;
  border-radius: 4px;
  padding: 5px 10px;
}
</style>
