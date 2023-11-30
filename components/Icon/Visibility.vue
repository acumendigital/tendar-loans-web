<template>
  <div class="visibility-icon">
    <button class="default-input">
      <i v-if="visibility" class="material-icons-outlined"> visibility </i>
      <i v-else class="material-icons-outlined"> visibility_off </i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    visibility: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style scoped>

.visibility-icon {
  cursor: pointer;
}

.default-input {
  width: min(30px, 30px);
  height: min(30px,30px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visibility-icon:hover .default-input {
  background: #e1e3e4;
  transform: none;
}
.material-icons-outlined {
  cursor: pointer;
  color: #858d96;
  font-size: 20px;
}
</style>
