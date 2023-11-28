<template>
  <div class="form-ctn">
    <div class="logo-ctn">
      <TendarPurpleLogo />
    </div>
    <div class="form-content">
      <slot />
    </div>
    <TendarBackground />
  </div>
</template>
<script>
export default {
  name: 'authLayout'
}
</script>

<style scoped>
.form-ctn {
  background: #f4f6fa;
  height: 100%;
  min-height: 100vh;
  display: flex;
  padding: 50px;
  flex-direction: column;
  align-items: center;
}
.form-content {
  background: #fff;
  width: 35vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 2vh 1vw;
  border-radius: 10px;
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}
</style>
