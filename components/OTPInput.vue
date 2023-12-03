<template>
  <div
    ref="pinCtn"
    class="pin-grid"
    :style="`grid-template-columns: repeat(${inputs}, auto)`"
  >
    <input
      v-for="i in Number(inputs)"
      :key="i"
      v-model="pin[i - 1]"
      maxlength="1"
      type="password"
      @input="nextInput($event, i)"
      @keyup.delete="previousInput($event.target, i)"
    />
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "PinInput",
  props: {
    inputs: {
      type: String,
      default: () => "4",
    },
  },
  data() {
    return {
      pin: [],
    };
  },
  mounted() {
    document.addEventListener("paste", this.pasteCodeFromClipboard);
  },
  methods: {
    nextInput(el, index) {
      const { value } = el.target;
      // console.log(el)
      // console.log(index)
      if (index < this.inputs) {
        if (
          value !== ""
          // &&
          // el.inputType !== 'deleteContentBackward'
        ) {
          this.$refs.pinCtn.children[index].focus();
        }
        //  else if (value === '' && el.inputType !== 'deleteContentBackward') {
        //   this.$refs.pinCtn.children[index+1].focus()
        // }
      }
      this.pin.length = this.inputs;
      this.$emit("input", this.pin.toString().replaceAll(",", ""));
    },
    previousInput(_el, index) {
      if (index > 1) {
        this.pin[index] = "";
        this.$refs.pinCtn.children[index - 2].focus();
      }
    },
    pasteCodeFromClipboard(e) {
      if (e.target.type === "password") {
        let data = e.clipboardData.getData("Text");
        data = data.split("");
        this.pin = data;
        this.$refs.pinCtn?.children?.[Number(this.inputs) - 1].focus();
      }
    },
  },
};
</script>

<style>
.pin-grid {
  display: grid;
  grid-template-columns: repeat(6, auto);
  column-gap: 15px;
}
.pin-grid input {
  text-align: center;
  font-size: 3rem;
  margin-right: 3%;
  padding: 0 0.5rem;
  caret-color: transparent;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  background: #f9fafc;
  border: 1px solid #bcc7d3;
  border-radius: 3px;
}
</style>
