<template>
  <div>
    <div class="loader" :style="`height: ${size ? size: 30}px; width:${size ? size : 30}px;border: ${borderWidth ? borderWidth : 2}px solid ${color ? color: '#fff'}; border-top-color: transparent`" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: () => 30
    },
    color: {
      type: String,
      default: () => ''
    },
    borderWidth: {
      type: Number,
      default: () => 2
    }
  }
}
</script>

<style scoped>
.loader {
  border-radius: 50%;
  border-top: 2px solid transparent;
  border: 2px solid #fff;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  /* min-width: 100%; */
  max-width: 30px;
  max-height: 30px;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
