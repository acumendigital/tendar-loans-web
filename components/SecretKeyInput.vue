<template>
  <div class="secret-key-input-ctn">
    <input
      :id="id"
      :type="type"
      autocomplete="on"
      autofill="on"
      :value="currentKey"
      :disabled="disabled || loading"
      :placeholder="placeholder"
      @input="updateValue($event.target.value)"
    />
    <div v-if="visibilityNeeded || copyNeeded" class="fxnality-side">
      <IconVisibility
        v-if="visibilityNeeded"
        :visibility="type === 'password'"
        class="visibility-icon"
        @click="toggleType()"
      />
      <IconCopied v-if="copyNeeded" :current-key="currentKey" />
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
    placeholder: {
      type: String,
      default: () => '',
    },
    visibilityNeeded: {
      type: Boolean,
      default: () => true,
    },
    showHiddenInput: {
      type: Boolean,
      default: () => false,
    },
    id: {
      type: String,
      default: () => ''
    },
    copyNeeded: {
      type: Boolean,
      default: () => true,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      type: 'text',
    }
  },
  computed: {
    loading () {
      // return this.$store.state.loading
    }
  },
  watch: {
    visibilityNeeded: {
      immediate: true,
      handler(val) {
        if (!val) {
          this.type = 'text'
        }
      },
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('update-value', e)
      this.type = 'password'
    },
    toggleType() {
      this.type = this.type === 'password' ? 'text' : 'password'
    }
  },
}
</script>

<style scoped>
.secret-key-input-ctn {
  position: relative;
  width: 100%;
}

input {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
}

.fxnality-side {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  height: 100%;
  top: 0;
  background: #f9fafc;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.fxnality-side > * {
  width: 100%;
  height: 100%;
}

.fxnality-side > div{
  border-top: 1px solid var(--border-one);
  border-bottom: 1px solid var(--border-one);
}

.fxnality-side > div:last-child {
  border-left: 1px solid var(--border-one);
  border-right: 1px solid var(--border-one);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.fxnality-side > div:not(.visibility-icon):last-child:hover {
  background: #ededed;
}
.fxnality-side > div.visibility-icon {
  border-left: none;
}

.fxnality-side > div:not(.visibility-icon).copied-active {
  border: 1px solid var(--success);
}

.visibility-icon {
  padding-right: 8px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
