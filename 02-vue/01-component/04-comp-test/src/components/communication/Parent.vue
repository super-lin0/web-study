<template>
  <div class="parent">
    父亲
    <child></child>
  </div>
</template>

<script>
import Child from "@/components/communication/Child.vue";
export default {
  components: {
    Child
  }
};
</script>

<style  scoped>
.parent {
  border: 2px solid green;
  margin: 5px;
}
</style>