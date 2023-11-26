<template>
  <div v-if="dataItems && dataItems.length" class="table-footer">
    <TablePageLimit
      v-if="showLimit"
      :limit-props="limit"
      @set-limit="$emit('set-limit', $event)"
    />
    <TableTotalEntries
      v-if="showEntries"
      :current-page-total="dataItems ? dataItems.length : 0"
      :total-data="totalData"
      :limit="limit"
      :total-pages="totalPages"
      :current-page="currentPage"
    />
    <TablePagination
      :current-page="currentPage"
      :next-page="nextPage"
      :prev-page="prevPage"
      :limit="limit"
      :total-pages="totalPages"
      @set-page="$emit('set-page', $event)"
      @next="$emit('next')"
      @prev="$emit('prev')"
    />
  </div>
</template>

<script>
export default {
  props: {
    dataItems: {
      type: Array,
      default: () => [],
    },
    showLimit: {
      type: Boolean,
      default: () => true,
    },
    showEntries: {
      type: Boolean,
      default: () => true,
    },
    limit: {
      type: Number,
      default: () => 0,
    },
    currentPage: {
      type: Number,
      default: () => 0,
    },
    totalData: {
      type: Number,
      default: () => 0,
    },
    totalPages: {
      type: Number,
      default: () => 0,
    },
    nextPage: {
      type: Number,
      default: () => 0,
    },
    prevPage: {
      type: Number,
      default: () => 0,
    },
  },
};
</script>
