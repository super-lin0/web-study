<template>
  <div class="grand">
    爷爷
    <parent></parent>
  </div>
</template>

<script>
import Parent from "@/components/communication/Parent.vue";
export default {
  components: {
    Parent
  },
  provide() {
    return { msg: "孙子，别跑" };
  }
};
</script>

<style  scoped>
.grand {
  border: 3px solid red;
  margin: 5px;
}
</style>