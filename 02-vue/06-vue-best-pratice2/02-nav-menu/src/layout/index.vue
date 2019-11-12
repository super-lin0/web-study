<template>
  <div class="app-wrapper">
    <side-menu></side-menu>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideMenu from "@/Sidemenu";

export default {
  components: {
    SideMenu
  }
};
</script>