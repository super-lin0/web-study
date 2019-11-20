<template>
  <div class="hello">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import User from "@/models/user";

@Component
export default class KForm extends Vue {
  @Provide() form = this;

  @Prop({ required: true }) private user: User;
  @Prop() private rules: object;

  validate(cb) {
    const tasks = this.$children
      .filter(item => !!item.prop)
      .map(item => item.validate());

    Promise.all(tasks)
      .then(() => cb(true))
      .catch(() => cb(false));
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
