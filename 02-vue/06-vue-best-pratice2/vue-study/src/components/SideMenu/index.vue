<template>
  <div id="app">
    <ul>
      <item class="item" 
        v-for="route in $store.state.permission.routes"
        :model="route"
        :key="route.path"
        :base-path="route.path"></item>
    </ul>
  </div>
</template>
<script>
import Item from "./Item.vue";
export default {
  components: { Item }
};
</script>