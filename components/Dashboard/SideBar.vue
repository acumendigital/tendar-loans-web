<template>
  <div class="sidebar_ctn flex flex-col p-3.5 min-h-screen gap-3 pd-10 pt-10">
    <p class="sidebar_title">GET STARTED</p>
    <NuxtLink
      v-for="(link, index) in nav"
      :key="index"
      :to="link.to"
      class="menu_link text-[#000] rounded-md h-[50px] hover:bg-[#7a62eb1a] flex justify-between align-center gap-2 px-5 group"
    >
      <span class="group-hover:text-[#7a62eb]">{{ link.name }}</span>
      <span v-html="link.icon" />
    </NuxtLink>
  </div>
</template>

<script setup lang="jsx">
const nav = ref([
  {
    to: "/dashboard",
    name: "Dashboard",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3.33594 6.66732H4.66927C6.0026 6.66732 6.66927 6.00065 6.66927 4.66732V3.33398C6.66927 2.00065 6.0026 1.33398 4.66927 1.33398H3.33594C2.0026 1.33398 1.33594 2.00065 1.33594 3.33398V4.66732C1.33594 6.00065 2.0026 6.66732 3.33594 6.66732Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.3359 6.66732H12.6693C14.0026 6.66732 14.6693 6.00065 14.6693 4.66732V3.33398C14.6693 2.00065 14.0026 1.33398 12.6693 1.33398H11.3359C10.0026 1.33398 9.33594 2.00065 9.33594 3.33398V4.66732C9.33594 6.00065 10.0026 6.66732 11.3359 6.66732Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M11.3359 14.6673H12.6693C14.0026 14.6673 14.6693 14.0007 14.6693 12.6673V11.334C14.6693 10.0007 14.0026 9.33398 12.6693 9.33398H11.3359C10.0026 9.33398 9.33594 10.0007 9.33594 11.334V12.6673C9.33594 14.0007 10.0026 14.6673 11.3359 14.6673Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M3.33594 14.6673H4.66927C6.0026 14.6673 6.66927 14.0007 6.66927 12.6673V11.334C6.66927 10.0007 6.0026 9.33398 4.66927 9.33398H3.33594C2.0026 9.33398 1.33594 10.0007 1.33594 11.334V12.6673C1.33594 14.0007 2.0026 14.6673 3.33594 14.6673Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,
  },
  {
    to: "/loans",
    name: "Loans",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M11.3359 13.6673H4.66927C2.66927 13.6673 1.33594 12.6673 1.33594 10.334V5.66732C1.33594 3.33398 2.66927 2.33398 4.66927 2.33398H11.3359C13.3359 2.33398 14.6693 3.33398 14.6693 5.66732V10.334C14.6693 12.6673 13.3359 13.6673 11.3359 13.6673Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M3.66406 6.33398V9.66732" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.3359 6.33398V9.66732" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
  },
  {
    to: "/wallet",
    name: "Wallet",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4.58594 12.1007V10.7207" stroke="#10253E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M8 12.0998V9.33984" stroke="#10253E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11.4141 12.0998V7.95312" stroke="#10253E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M11.4126 3.90039L11.1059 4.26039C9.40594 6.24706 7.12594 7.65372 4.58594 8.28706" stroke="#10253E" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M9.46094 3.90039H11.4143V5.84706" stroke="#10253E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6.0026 14.6673H10.0026C13.3359 14.6673 14.6693 13.334 14.6693 10.0007V6.00065C14.6693 2.66732 13.3359 1.33398 10.0026 1.33398H6.0026C2.66927 1.33398 1.33594 2.66732 1.33594 6.00065V10.0007C1.33594 13.334 2.66927 14.6673 6.0026 14.6673Z" stroke="#10253E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,
  },
  {
    to: "/settings",
    name: "Settings",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M1.33594 8.5863V7.41297C1.33594 6.71963 1.9026 6.1463 2.6026 6.1463C3.80927 6.1463 4.3026 5.29297 3.69594 4.2463C3.34927 3.6463 3.55594 2.8663 4.1626 2.51963L5.31594 1.85963C5.8426 1.5463 6.5226 1.73297 6.83594 2.25963L6.90927 2.3863C7.50927 3.43297 8.49594 3.43297 9.1026 2.3863L9.17594 2.25963C9.48927 1.73297 10.1693 1.5463 10.6959 1.85963L11.8493 2.51963C12.4559 2.8663 12.6626 3.6463 12.3159 4.2463C11.7093 5.29297 12.2026 6.1463 13.4093 6.1463C14.1026 6.1463 14.6759 6.71297 14.6759 7.41297V8.5863C14.6759 9.27963 14.1093 9.85297 13.4093 9.85297C12.2026 9.85297 11.7093 10.7063 12.3159 11.753C12.6626 12.3596 12.4559 13.133 11.8493 13.4796L10.6959 14.1396C10.1693 14.453 9.48927 14.2663 9.17594 13.7396L9.1026 13.613C8.5026 12.5663 7.51594 12.5663 6.90927 13.613L6.83594 13.7396C6.5226 14.2663 5.8426 14.453 5.31594 14.1396L4.1626 13.4796C3.55594 13.133 3.34927 12.353 3.69594 11.753C4.3026 10.7063 3.80927 9.85297 2.6026 9.85297C1.9026 9.85297 1.33594 9.27963 1.33594 8.5863Z" stroke="#10253E" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
  },
]);
</script>

<style scoped>
.sidebar_ctn {
  position: fixed;
  margin-top: 90px;
  background-color: #f5f8f9;
  /* z-index: 2; */
  width: 17%;
}
.sidebar_title {
  margin-left: 20px;
  color: #84919a;
  margin-bottom: 10px;
}

.menu_link {
  transition: 0.4s ease;
}

.router-link-exact-active,
.router-link-active:not(.first-link) {
  background-color: rgba(122, 98, 235, 0.1);
}

.router-link-exact-active span,
.router-link-active span:not(.first-link),
.router-link-exact-active path,
.router-link-active path:not(.first-link) {
  padding-left: 15px;
  color: var(--primary-purple);
  stroke: var(--primary-purple);
}
</style>
