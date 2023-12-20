<template>
  <div class="overlay-screen" />
</template>

<script>
export default {}
</script>

<style scoped>
.overlay-screen {
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0);
  z-index: 15;
}
</style>
