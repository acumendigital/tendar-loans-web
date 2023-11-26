<template>
  <DatePicker
    v-model="date"
    class="date-picker"
    :lang="lang"
    format="YYYY-MM-DD"
    type="date"
    value-type="format"
    :placeholder="placeholder"
    @change="$emit('update-date', date)"
  />
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
export default {
  components: {
    DatePicker,
  },
  props: {
    dateProps: {
      type: String,
      default: () => "",
    },
    placeholder: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      date: "",
      lang: {
        formatLocale: {
          firstDayOfWeek: 0,
        },
        monthBeforeYear: false,
      },
    };
  },
  watch: {
    dateProps: {
      immediate: true,
      handler(val) {
        this.date = val;
      },
    },
  },
};
</script>
