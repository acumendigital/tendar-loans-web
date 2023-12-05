<template>
  <div>
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
.sidebar_main {
  display: flex;
}

.main_content {
  padding: 3rem 3rem;
  margin-top: 90px;
  margin-left: 300px;
  z-index: 1;
  width: 100%;
  max-width: 1300px;
}
</style>
