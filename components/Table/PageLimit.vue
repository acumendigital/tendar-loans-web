<template>
  <div class="page-select lhs">
    <span>Show</span>
    <div class="dropdown-div">
      <select
        v-model="limit"
        class="dropdown"
        @change="$emit('set-limit', limit)"
      >
        <option v-for="i in pages" :key="i" :value="i">{{ i }}</option>
      </select>
    </div>
    <span>entries</span>
  </div>
</template>

<script>
export default {
  props: {
    limitProps: {
      type: Number,
      default: () => 10,
    },
  },
  data() {
    return {
      pages: [5, 6, 7, 8, 9, 10, 15, 20, 25, 30],
      limit: 10,
    };
  },
  watch: {
    limitProps: {
      immediate: true,
      handler(val) {
        this.limit = val;
      },
    },
  },
};
</script>

<style scoped>
.dropdown-div select {
  border-radius: 0;
  width: 70px;
  border: 1px solid var(--border-one) !important;
}
</style>
