<template>
  <div class="loading-container table-container">
    <div class="table-main-heading" :style="!paginated ? 'padding-top: 0' : ''">
      <div class="top">
        <div class="sm-title">
          {{ title }}
        </div>
      </div>
      <div v-if="paginated" class="search-filter-row">
        <div class="skeleton card" style="flex-basis: 30%; height: 35px" />
        <div class="skeleton card" style="flex-basis: 20%; height: 35px" />
      </div>
    </div>
    <table>
      <tr class="table-header">
        <td class="td-5">
          <div class="th-content">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </div>
        </td>
        <td class="td-5">
          <div class="th-content">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </div>
        </td>
        <td class="td-4">
          <div class="th-content">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </div>
        </td>
        <td v-if="arrowRhs" class="td-1">
          <div class="th-content"></div>
        </td>
      </tr>
      <tbody>
        <tr v-for="i in 5" :key="i" class="table-row">
          <td class="td-5">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </td>
          <td class="td-5">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </td>
          <td class="td-4">
            <div class="skeleton card" style="width: 100%; height: 30px" />
          </td>
          <td v-if="arrowRhs" class="td-1">
            <div
              class="skeleton card"
              style="width: 20px; height: 20px; border-radius: 50%"
            />
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
    paginated: {
      type: Boolean,
      default: () => true,
    },
    arrowRhs: {
      type: Boolean,
      default: () => true,
    },
    individual: {
      type: Boolean,
      default: () => false,
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
  },
};
</script>

<style scoped>
.table-main-heading {
  margin-bottom: 20px;
  padding-top: 30px;
  /* border-top: 1px solid var(--border-one); */
}

.table-main-heading .top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.table-main-heading .search-filter-row {
  margin-top: 20px;
}

.table-container {
  box-shadow: none;
}

.table-header {
  border-left: none;
  border-right: none;
}

tr.table-row {
  height: 65px;
}
</style>
