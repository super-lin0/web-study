<template>
  <div class="box" v-if="isShow">
    <h3>{{title}}</h3>
    <p>{{content}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  methods: {
    show() {
      this.isShow = true;
      setTimeout(this.hide, this.duration);
    },
    hide() {
      this.isShow = false;
      this.remove();
    }
  },
  data() {
    return {
      isShow: false
    };
  }
};
</script>

<style scoped>
.box {
  border: 3px solid gray;
}
</style>