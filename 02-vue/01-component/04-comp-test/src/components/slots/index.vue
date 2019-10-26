<template>
  <div>
    <anonymous v-slot:default>Hello World</anonymous>
    <named v-slot:content>Hello World,具名函数</named>
    <Scope v-slot:default="{msg}">{{msg}}</Scope>
  </div>
</template>

<script>
import Anonymous from "@/components/slots/Anonymous.vue";
import Named from "@/components/slots/Named.vue";
import Scope from "@/components/slots/Scope.vue";

export default {
  components: {
    Anonymous,
    Named,
    Scope
  }
};
</script>

<style lang="scss" scoped>
</style>