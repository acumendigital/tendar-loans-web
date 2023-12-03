<template>
  <div>
    <div>
      <div class="title">Settings</div>
    </div>
    <div class="settings_section">
      <div class="lhs">
        <VertTabHeaders
          class="tab-ctns"
          :tabs="['Personal Details', 'Cards', 'Bank account management', 'Security']"
          :active-tab="activeTab"
          @set-active-tab="setActiveTab"
        />
      </div>
      <div class="center_line"></div>
      <div class="rhs">
        <SettingsPersonalDetails v-if="activeTab === 'Personal Details'" />
      </div>
    </div>
  </div>
</template>

<script setup>
const activeTab = ref('Personal Details');

const setActiveTab = (tab) => {
  activeTab.value = tab
};
</script>

<style scoped>
.title {
  color: var(--dark-gray-dark-gray-2, #252c32);
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
}

.settings_section {
  display: flex;
}

.lhs {
  flex-basis: 12%;
}

.center_line {
  border-left: 2px solid #E5E9EB;
  height: 25rem;
}
</style>
