<template>
  <div
    class="header_ctn border-slate-50 border-2 "
  >
    <div class="h-[90px] flex justify-between align-center max-w-[1600px]">
      <TendarLogo />
      <div class="profile">
        <p class="username">Lanre Anderson</p>
        <img src="~assets/images/Ellipse 45.png" alt="" />
        <!-- <MazDropdown :items="dropDownItems">
        Josh Anaba
        <MazAvatar
          src="https://pbs.twimg.com/profile_images/598181608198381570/-cFG43y2_400x400.jpg"
        />
      </MazDropdown> -->
      </div>
    </div>
  </div>
</template>

<script setup>
// const dropDownItems = ref([
//   { label: "Profile", to: '/profile' },
//   { label: "Link (href)", href: "https://www.google.com", target: "_blank" },
//   { label: "Router Link", to: { name: "index" } },
// ]);
</script>

<style scoped>
.header_ctn {
  position: fixed;
  width: 100%;
  z-index: 5;
  background-color: #fff;
}
.profile {
  display: flex;
  align-items: center;
}

.profile img {
  margin-left: 15px;
}
</style>
