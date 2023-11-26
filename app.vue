<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <DashboardHeader />
    <div class="flex">
      <DashboardSideBar />
      <div class="w-4/5 p-10">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.dashboard {
  display: flex;
}
</style>
