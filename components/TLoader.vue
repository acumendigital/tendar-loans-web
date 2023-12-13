<template>
  <div>
    <div class="loader" :style="`height: ${size ? size: 50}px; width:${size ? size : 50}px;border: ${borderWidth ? borderWidth : 10}px solid ${color ? color: '#7a62eb'}; border-top-color: transparent`" />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: () => 50
    },
    color: {
      type: String,
      default: () => ''
    },
    borderWidth: {
      type: Number,
      default: () => 5
    }
  }
}
</script>

<style scoped>
.loader {
  border-radius: 50%;
  border-top: 5px solid transparent;
  border: 5px solid #fff;
  -webkit-animation: spin 1s linear infinite;
  animation: spin 1s linear infinite;
  /* min-width: 100%; */
  max-width: 50px;
  max-height: 50px;
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
