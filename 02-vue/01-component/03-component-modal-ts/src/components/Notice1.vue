<template>
  <div class="box" v-if="isShow">
    <h1>{{ title }}</h1>
    <p class="box-content">{{message}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop({ default: 1000 }) private duration!: number;
  @Prop() private title!: string;
  @Prop() private message!: string;

  private isShow: boolean = false;

  show() {
    this.isShow = true;
    setTimeout(() => {
      this.hide();
    }, this.duration);
  }

  hide() {
    this.isShow = false;
    this.remove();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  position: fixed;
  width: 100%;
  top: 16px;
  left: 0;
  text-align: center;
  pointer-events: none;
  background-color: #fff;
  border: grey 3px solid;
  box-sizing: border-box;
}
.box-content {
  width: 200px;
  margin: 10px auto;
  font-size: 14px;
  padding: 8px 16px;
  background: #fff;
  border-radius: 3px;
  margin-bottom: 8px;
}
</style>
