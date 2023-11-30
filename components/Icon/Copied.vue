<template>
  <div :class="['copy-ctn', copied && 'copied-active']">
    <button
      :disabled="copiedActive"
      class="default-input"
      :style="`${copiedActive && 'cursor: unset;'}`"
      @click="copyText()"
    >
      <IconCheck v-if="copied" />
      <IconCopy v-else />
    </button>
    <div v-if="copied" ref="indicator" class="indicator come-up">
      <div class="details-indicator">
        <p>Copied!</p>
      </div>
      <div class="arrow-head" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentKey: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      copied: false,
    }
  },
  computed: {
    copiedActive: {
      get() {
        return this.$store.state.keyCopied
      },
      set(val) {
        return val
      },
    },
  },
  created() {
    this.$store.commit('setKeyCopied', null)
  },
  methods: {
    copyText() {
      navigator.clipboard.writeText(this.currentKey)
      this.copied = true
      this.$store.commit('setKeyCopied', true)
      setTimeout(() => {
        this.copied = null
        this.$store.commit('setKeyCopied', null)
      }, 2000)
    },
  },
}
</script>

<style scoped>
.copy-ctn {
  position: relative;
}

button {
  height: 100%;
  width: 100%;
  cursor: pointer;
  padding: 0 0.875rem;
  position: relative;
}

.default-input:hover {
  transform: none;
}

.indicator {
  position: absolute;
  bottom: 55px;
  width: 100%;
  z-index: 20;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.details-indicator {
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px 10px;
  color: #fff;
  position: relative;
}

.arrow-head {
  background: rgba(0, 0, 0, 0.7);
  width: 13px;
  height: 8px;
  position: relative;
  clip-path: polygon(50% 100%, 0 0, 100% 0%);
}

.indicator p {
  color: #fff;
  font-size: 13px;
  line-height: 17px;
}
</style>
