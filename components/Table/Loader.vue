<template>
  <div
    class="loading-container table-container"
    :style="noBoxShadow ? 'box-shadow: none' : ''"
  >
    <div
      v-if="tableTitle"
      class="table-main-heading"
      :style="!paginated ? 'padding-top: 0' : ''"
    >
      <div class="top flex">
        <div class="lhs">
          <div :class="[subTitle ? 'title' : 'sm-title']">{{ title }}</div>
          <div class="sub-title">{{ subTitle }}</div>
        </div>
        <div class="rhs">
          <div class="skeleton card" style="width: 140px; height: 45px" />
        </div>
      </div>
      <LoadersTabHeaders
        v-if="tabHeadersLoader"
        :loader-length="tabHeadersLoaderLength"
      />
      <div v-if="paginated" class="search-filter-row">
        <div class="skeleton card" style="width: 25%; height: 35px" />
        <div class="skeleton card" style="width: 10%; height: 35px" />
      </div>
    </div>
    <table>
      <tr
        v-if="!tableHeadersDetails.length"
        class="table-header"
        :style="!paginated ? 'border-left: none; border-right: none' : ''"
      >
        <td v-if="checkboxLoader" class="td-1">
          <div class="skeleton card" style="width: 25px; height: 25px" />
        </td>
        <td v-for="i in tableColLength" :key="i" class="td-3">
          <div class="skeleton card" style="width: 100%; height: 30px" />
        </td>
      </tr>
      <tr v-else class="table-header" :style="!paginated ? 'border: none' : ''">
        <td v-for="i in tableHeadersDetails" :key="i" class="td-3">
          <div class="th-content">
            {{ i }}
          </div>
        </td>
      </tr>
      <tbody>
        <tr v-for="i in tableRowLength" :key="i" class="table-row">
          <td v-if="checkboxLoader" class="td-1">
            <div class="skeleton card" style="width: 25px; height: 25px" />
          </td>
          <td v-for="s in tableColLength" :key="s" class="td-3">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="paginated" class="table-footer">
      <div class="page-select lhs">
        <div class="skeleton card" style="width: 35px; height: 25px" />
        <div class="skeleton card" style="width: 45px; height: 25px" />
        <div class="skeleton card" style="width: 35px; height: 25px" />
      </div>
      <div class="mhs">
        <div class="skeleton card" style="width: 45px; height: 25px" />
        <div class="skeleton card" style="width: 45px; height: 25px" />
        <div class="skeleton card" style="width: 45px; height: 25px" />
      </div>
      <div class="rhs">
        <div class="skeleton card" style="width: 50px; height: 25px" />
        <div class="skeleton card" style="width: 25px; height: 25px" />
        <div class="skeleton card" style="width: 25px; height: 25px" />
        <div class="skeleton card" style="width: 50px; height: 25px" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: () => "",
    },
    subTitle: {
      type: String,
      default: () => "",
    },
    tabHeadersLoader: {
      type: Boolean,
      default: () => false,
    },
    tableTitle: {
      type: Boolean,
      default: () => true,
    },
    mainHeading: {
      type: Boolean,
      default: () => true,
    },
    paginated: {
      type: Boolean,
      default: () => true,
    },
    checkboxLoader: {
      type: Boolean,
      default: () => false,
    },
    noBoxShadow: {
      type: Boolean,
      default: () => false,
    },
    tabHeadersLoaderLength: {
      type: Number,
      default: () => 3,
    },
    tableColLength: {
      type: Number,
      default: () => 5,
    },
    tableHeadersDetails: {
      type: Array,
      default: () => [],
    },
    tableRowLength: {
      type: Number,
      default: () => 5,
    },
  },
};
</script>

<style scoped>
tr {
  cursor: progress;
}

.table-header {
  border: none;
}
</style>
