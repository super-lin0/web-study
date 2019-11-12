<template>
  <div class="app-wrapper">
    <!-- 导航 -->
    <side-menu></side-menu>
    <sidebar class="sidebar-container" />
    <!-- 内容 -->
    <div class="main-container">
      <!-- 面包屑 -->
      <bread-low></bread-low>
      <breadcrumb></breadcrumb>
      <router-view />
    </div>
  </div>
</template>
<script>
import SideMenu from '@/components/SideMenu'
import Sidebar from '@/components/Sidebar'
import BreadLow from '@/components/BreadLow'
import Breadcrumb from '@/components/Breadcrumb'

export default {
  components: {
    SideMenu, Sidebar, BreadLow, Breadcrumb
  },
}
</script>