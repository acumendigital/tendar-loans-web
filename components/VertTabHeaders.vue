<template>
  <div
    class="vert-tabs-ctn"
    :style="`gap: ${tabSpacing || '30'}; padding-left: ${
      paddingLeft || '0'
    }`"
  >
    <div
      v-for="(tab, Id) in tabs"
      :key="Id"
      :class="`tab ${activeTab === tab ? 'active' : ''}`"
      @click="$emit('set-active-tab', tab)"
    >
      <div>
        {{ tab }}
      </div>
    </div>
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
.vert-tabs-ctn {
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* border-left: 1px solid var(--border-one); */
  padding: 8px 0;
  width: 300px;
}

.tab {
  cursor: pointer;
  font-weight: 500;
  transition: all 0.1s ease-out;
}

.tab div {
  background: #fff;
  color: var(--gray-light);
  width: 100%;
  font-weight: 500;
  padding: 10px 15px 10px 0;
  margin-left: 3px;
}

.tab.active {
  background-position: bottom left;
  /* border-left: 2.5px solid var(--primary-purple); */
}

.tab.active div {
  color: #252C32;
  font-weight: 700;
}
</style>
