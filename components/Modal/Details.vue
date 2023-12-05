<template>
  <div class="modal-reminder-ctn reveals">
    <div class="ctn">
      <div :class="`modal-body modal-body-${modal}`">
        <div class="cancel-btn" @click="$emit('closeModal')">
          <span class="material-icons md-64"> close </span>
        </div>
        <div class="body-start">
          <slot name="modaldetails" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modal: {
    type: String,
    default: () => "",
  },
});

// const try = ref('');
// export default {
//   props: {
//     modal: {
//       type: String,
//       default: () => "",
//     },
//   },
//   data() {
//     return {
//       try: "",
//     };
//   },
// };
</script>

<style scoped>
.body-start {
  width: 100%;
}
</style>
