<template>
  <div class="k-input">
    <input :type="type" @input="onInput" :value="value" v-bind="$attrs" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component({
  inheritAttrs: false
})
export default class KInput extends Vue {
  @Prop() private value!: string;
  @Prop({ type: String, default: "text" }) private type!: string;

  onInput(e: InputEvent) {
    const input = e.target as HTMLInputElement;

    this.input(input.value);

    this.$parent.$emit("validate");
  }

  @Emit("input")
  input(value) {
    return value;
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
