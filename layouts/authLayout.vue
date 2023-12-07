<template>
  <div class="form-ctn">
    <!-- <div class="form-content">
      
    </div> -->
    <slot />
    <div class="bottom_links">
      <p class="text_link">Powered by Tendar</p>
      <p class="strokes">|</p>
      <p class="text_link">Terms & Conditions</p>
      <p class="strokes">|</p>
      <p class="text_link">Privacy Policy</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'authlayout'
}
</script>

<style scoped>
.form-ctn {
  background: #f4f6fa;
  height: 100%;
  min-height: 100vh;
  display: flex;
  /* padding: 50px; */
  /* padding-top: 70px; */
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

.bottom_links {
  display: flex;
  justify-content: center;
  /* width: 100%; */
}

.text_link {
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
}

.strokes {
  margin: 0 20px;
}

.text_link:hover {
  color: var(--primary-purple);
}
</style>
