<template>
  <div class="global_ctn">
    <DashboardHeader @open-modal="showLogout = true" />
    <div class="sidebar_main">
      <DashboardSideBar />
      <div class="main_content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const showLogout = ref(false)
</script>

<style scoped>
.global_ctn {
  background-color: #fff;
}
.sidebar_main {
  display: flex;
}

.main_content {
  background-color: #fff;
  padding: 3rem 2vw;
  margin-top: 90px;
  margin-left: 17vw;
  /* z-index: 1; */
  width: 83%;
  max-width: 1300px;
}
</style>
