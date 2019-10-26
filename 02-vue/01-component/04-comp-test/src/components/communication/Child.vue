<template>
  <div class="son">儿子:来自祖先的问候:{{msg}}</div>
</template>

<script>
export default {
  inject: ["msg"]
};
</script>

<style scoped>
.son {
  border: 3px solid black;
  margin: 5px;
}
</style>