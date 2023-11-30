<template>
  <label class="checkbox-container">
    <input type="checkbox" :checked="checked" :disabled="disabled" @input="toggleCheck" />
    <span
      v-if="!header"
      class="checkmark"
      :style="[checked ? 'border-color: #7a62eb' : '#858d96']"
    ></span>
    <span
    v-else
      class="header-checkmark"
      :style="[checked ? 'border-color: #7a62eb' : '#858d96']"
    ></span>
  </label>
</template>

<script>
export default {
  props: {
    checked: {
      type: Boolean,
      default: () => false,
    },
    header: {
      type: Boolean,
      default: () => false,
    },
    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      checkValue: false
    }
  },
  methods: {
    toggleCheck(e) {
      this.checkValue = e.target.checked
      this.$emit('toggle-check', this.checkValue)
    },
  },
}
</script>

<style scoped>
.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
/* Hide the browser's default checkbox */
.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkbox-container input:focus {
  border: none !important;
}
/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: -3px;
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 3px;
  background-color: var(--input-bg);
  border: 1px solid #858d96;
  box-shadow: var(--container-shadow);
}
.header-checkmark {
  position: absolute;
  /* top: -3px; */
  left: 0;
  height: 18px;
  width: 18px;
  border-radius: 3px;
  background-color: var(--input-bg);
  border: 1px solid #858d96;
  box-shadow: var(--container-shadow);
}
/* On mouse-over, add a grey background color */
/* .checkbox-container:hover input ~ .checkmark { */
  /* background-color: var(--purple-light); */
/* } */
/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark, 
.checkbox-container input:checked ~ .header-checkmark {
  background-color: var(--primary-purple);
}
/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after, .header-checkmark:after {
  content: '';
  position: absolute;
  display: none;
}
/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}
.checkbox-container input:checked ~ .header-checkmark:after {
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
  left: 5px;
  top: 0px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.checkbox-container .header-checkmark:after {
  left: 0; 
  bottom: calc(50% - 1px);
  right: 0; 
  margin-left: auto; 
  background: #fff;
  margin-right: auto; 
  width: 80%;
  height: 3px;
  /* border: 1.5px solid white; */
  /* border-width: 0 2px 2px 0; */
}
</style>