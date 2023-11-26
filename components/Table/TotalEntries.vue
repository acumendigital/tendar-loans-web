<template>
  <div class="mhs">
    Showing <b>{{ currentPageTotal ? currentPageStart : 0 }}</b> to
    <b>{{ currentPageTotal ? currentPageStop : 0 }}</b> of
    <b>{{ totalData }}</b> Entries
  </div>
</template>

<script>
export default {
  props: {
    totalData: {
      type: Number,
      default: () => 0,
    },
    currentPageTotal: {
      type: Number,
      default: () => 0,
    },
    limit: {
      type: Number,
      default: () => 0,
    },
    totalPages: {
      type: Number,
      default: () => 0,
    },
    currentPage: {
      type: Number,
      default: () => 0,
    },
  },
  computed: {
    // current page start previous page * limit + 1
    currentPageStart() {
      return (this.currentPage - 1) * this.limit + 1;
    },
    // current page start + current page total
    currentPageStop() {
      return this.currentPageStart + this.currentPageTotal - 1;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 800px) {
  .mhs {
    display: none;
  }
}
</style>
