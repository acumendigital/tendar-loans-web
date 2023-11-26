<template>
  <div class="overlay-screen"></div>
</template>

<script>
export default {};
</script>

<style scoped>
.overlay-screen {
  width: 100vw;
  max-width: 100vw;
  min-height: 100vh;
  inset: 0;
  position: fixed;
  background: rgb(0, 0, 0, 0);
  /* background: rgb(112, 112, 112); */
  z-index: 50;
  cursor: default;
}
</style>
