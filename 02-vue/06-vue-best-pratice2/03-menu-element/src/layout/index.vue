<template>
  <div class="app-wrapper">
    <side-menu></side-menu>
    <sidebar />
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/components/Sidemenu";
import Sidebar from "@/components/Sidebar";

export default {
  components: {
    Sidebar,
    SideMenu
  }
};
</script>
