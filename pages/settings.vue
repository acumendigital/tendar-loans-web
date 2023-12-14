<template>
  <div>
    <div>
      <h1 class="title">Settings</h1>
    </div>
    <div class="settings_section">
      <div class="lhs">
        <VertTabHeaders
          class="tab-ctns"
          :tabs="[
            'Personal Details',
            'Cards',
            'Bank Account Management',
            'Security',
          ]"
          :active-tab="activeTab"
          @set-active-tab="setActiveTab"
        />
      </div>
      <div class="center_line"></div>
      <div class="rhs">
        <SettingsPersonalDetails v-if="activeTab === 'Personal Details'" @editProfile="editProfile = !editProfile" />
        <SettingsCards v-if="activeTab === 'Cards'" @addCard="addCard = true" />
        <SettingsAccountManagement
          v-if="activeTab === 'Bank Account Management'" @addBank="addBank = true"
        />
        <SettingsSecurity v-if="activeTab === 'Security'" />
      </div>
    </div>
    <ModalSettingsAddBank v-if="addBank" @close-modal="addBank = false" />
    <ModalSettingsAddCard v-if="addCard" @close-modal="addCard = false" />
    <ModalEditProfile v-if="editProfile" @close-modal="editProfile = false" @continue="editProfile = false"  />
  </div>
</template>

<script setup>
const route = useRoute();

const updateRoute = (val) => {
  navigateTo({
    path: '/settings',
    query: {
      tab: val,
    },
  });
};

// updateRoute('Personal Details');
// console.log(route.params.tab);
const editProfile = ref(false)
const addBank = ref(false);
const addCard = ref(false);
const activeTab = ref(route.query?.tab || "Personal Details");

const setActiveTab = (tab) => {
  activeTab.value = tab;
  updateRoute(tab);
};
</script>

<style scoped>
.title {
  color: #252c32;
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
}

.settings_section {
  display: flex;
}

/* .lhs {
  flex-basis: 12%;
} */

.center_line {
  border-left: 2px solid #e5e9eb;
  height: 25rem;
}

.rhs {
  flex-basis: 60%;
}
</style>
