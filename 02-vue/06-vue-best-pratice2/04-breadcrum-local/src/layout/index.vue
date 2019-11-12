<template>
  <div class="app-wrapper">
    <!-- <side-menu></side-menu> -->
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <bread></bread>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import SideMenu from "@/components/Sidemenu";
import Sidebar from "@/components/Sidebar";

import Bread from "@/components/bread";

export default {
  components: {
    Sidebar,
    Bread
    // SideMenu
  }
};
</script>

<style>
.app-wrapper {
  display: flex;
}
.sidebar-container {
  width: 20vw;
  height: 100vh;
}
.main-container {
  width: 80vw;
  height: 100vh;
}
</style>
