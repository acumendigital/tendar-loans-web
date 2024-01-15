<template>
  <div class="">
      <div class="top_box">
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
      </div>
      <div class="box">
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
      </div>
      <div class="box">
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
        <div class="skeleton card" style="width: 90%; height: 32px" />
      </div>
    </div>
</template>

<script>
export default {
};
</script>

<style scoped>
.box .skeleton, .top_box .skeleton {
  margin-bottom: 5px !important;
}
.top_box {
  width: 50%;
  margin-bottom: 30px;
}
.box {
  margin-bottom: 30px;
}
</style>
