<template>
  <div>
    <span v-for="(item, idx) in items" :key="item.path">
      <!-- 最后一项时只显示文本 -->
      <span v-if="idx === items.length - 1">{{item.meta.title}}</span>
      <!-- 否则显示超链接 -->
      <span v-else>
        <router-link :to="item">{{item.meta.title}}</router-link>
        <span>/</span>
      </span>
    </span>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      console.log(this.$route.matched);
        
      // 根据matched数组获取面包屑数组
      // 要求必须有title且breadcrumb不为false
      return this.$route.matched.filter(
        item => item.meta && item.meta.title
      );
    }
  }
};
</script>