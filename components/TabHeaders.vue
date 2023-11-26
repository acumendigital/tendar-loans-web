<template>
  <div
    class="tabs-ctn"
    :style="`gap: ${tabSpacing || '30'}; padding-left: ${paddingLeft || '0'}`"
  >
    <button
      v-for="(tab, Id) in tabs"
      :key="Id"
      :class="`tab default-input ${activeTab.toLowerCase() === tab.toLowerCase() ? 'active' : ''}`"
      @click="$emit('set-active-tab', tab)"
    >
      <div class="content">
        {{ tab }}
      </div>
      <div class="indicator" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeTab: {
      type: String,
      default: () => '',
    },
    tabSpacing: {
      type: String,
      default: () => '',
    },
    paddingLeft: {
      type: String,
      default: () => '',
    },
    paddingRight: {
      type: String,
      default: () => '',
    },
  },
}
</script>

<style scoped>
.tabs-ctn {
  display: flex;
  width: 100%;
  gap: 3px;
  padding: 0 10px;
  border-bottom: 1px solid var(--border-one);
}

.tab {
  position: relative;
  cursor: pointer;
  min-height: 40px;
  transition: all 0.6s ease-out;
  display: flex;
  flex-direction: column;
}

.tab .content  {
  color: var(--gray-two);
  white-space: nowrap;
  min-width: 100%;
  font-weight: 400;
  padding: 10px 15px;
  margin-bottom: 2.5px;
  transition: 0.3s;
}

.tab:hover .content  {
  background-color: var(--clear-btn-hover);
  border-radius: 5px;
}

.tab .indicator {
  height: 1px;
  width: 100%;
  /* background-color: red; */
  background: linear-gradient(to right, var(--gray-two) 0%, transparent 50%);
  background-size: 200% 100%;
  background-position: right bottom;
}

.tab.active .indicator {
  background: linear-gradient(to right, var(--gray-two) 50%, transparent 50%);
  background-size: 200% 100%;
  background-position: left bottom;
  transition: all 0.6s ease-out;
}

.tab.active .content {
  font-family: var(--HS-Bold);
}

button.default-input {
  transform: none;
}
</style>
