<template>
  <div>
    index page
    <p>{{$store.state.count}}</p>
    <button @click="$store.commit('add')">add</button>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    return store.dispatch("getCount");
  }
};
</script>

<style scoped>
</style>