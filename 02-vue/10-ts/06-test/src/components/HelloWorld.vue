<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="todo" @change="addMsg" />
    <ul v-for="item in $store.state.todo.messages" :key="item.id">
      <li @click="deleteMsg(item.id)">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Message from "@/model/Message";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private todo: string = "";

  messages: Message[] = [];

  mounted() {
    this.$store
      .dispatch("todo/list")
      .then(res => {
        this.messages = res;
      })
      .catch(_ => {
        alert("出错了");
      });
  }

  addMsg(): void {
    this.$store.dispatch("todo/add", { todo: this.todo });
    this.todo = "";
  }

  deleteMsg(id: number): void {
    this.$store.dispatch("todo/delete", { id });
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
