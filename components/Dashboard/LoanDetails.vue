<template>
  <TableDetails :isOpenProp="isOpenProp"
        @update:isOpenProp="updateIsOpen">
    <template #tableDetails>
      <h1>David Emaye</h1>
    </template>
  </TableDetails>
</template>

<script>
export default {
  props: {
    isOpenProp: Boolean,
  },
  // watch: {
  //   isOpenProp(newVal) {
  //   },
  // },
  methods: {
    updateIsOpen() {
      this.$emit("update:isOpenProp", false); // Emit an event to update the prop in the parent
    },
  },

}
</script>

<style scoped>

</style>