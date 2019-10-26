<template>
  <div class="child-to-parent">
    <input type="button" value="send" @click="sendHandle" />
  </div>
</template>

<script>
export default {
  methods: {
    sendHandle() {
      this.$emit("send");
    }
  }
};
</script>

<style  scoped>
.child-to-parent {
  border: 1px solid black;
  margin: 10px;
}
</style>