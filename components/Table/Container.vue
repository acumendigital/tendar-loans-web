<template>
  <div class="table-container" :style="dataItemLoading && 'opacity: 0.5'">
    <slot name="table" />
  </div>
</template>

<script>
export default {
  props: {
    dataItemLoading: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style scoped>
.sticky-loader {
  margin: auto;
  width: 120px;
  /* border: 1px solid grey; */
  padding: 5px;
  text-align: center;
  border-radius: 0 0 5px 5px;
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  background: #fff;
  z-index: 25;
  font-weight: 500;
  box-shadow: var(--container-shadow);
}

b,
strong {
  font-weight: 500;
}
</style>
