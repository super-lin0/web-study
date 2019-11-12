<template>
  <div class="app-wrapper">
    <side-menu></side-menu>
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/Sidemenu";
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    SideMenu,
    Sidebar
  }
};
</script>
