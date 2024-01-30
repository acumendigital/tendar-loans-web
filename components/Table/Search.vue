<template>
  <div class="search-ctn">
    <input
      :id="`${tableType}-table-search`"
      v-model="search"
      type="search"
      class="default-input search"
      :placeholder="`Search by ${searchName}`"
      @input="searchTable($event.target.value)"
    />
    <label :for="`${tableType}-table-search`">
      <svg
      v-if="!loading"
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="9.5" cy="9.5" r="8.5" stroke="#888F9B" stroke-width="1.5" />
        <line
          x1="17.0607"
          y1="17"
          x2="19"
          y2="18.9393"
          stroke="#888F9B"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <BtnLoader v-else :size="15" :color="'#888F9B'" />
    </label>
    <button
      v-if="search.length"
      class="material-icons-round cancel-btn"
      @click="
        search = '';
        $emit('search', '');
      "
    >
      close
    </button>
  </div>
</template>

<script>
export default {
  props: {
    tableType: {
      type: String,
      default: () => "",
    },
    searchName: {
      type: String,
      default: () => "",
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      search: this.$route.query?.q || "",
      timeOut: null,
    };
  },
  methods: {
    preventSpace(e) {
      const key = e.keyCode;
      if (key === 32) {
        e.preventDefault();
      }
    },
    searchTable(value) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        this.$emit("search", value);
      }, 1000);
    },
  },
};
</script>

<style scoped>
.search-ctn {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 40px;
  min-width: 30%;
  max-width: 180px;
  position: relative;
}

.search-ctn input {
  width: 100%;
  height: 100%;
  color: var(--th-content-color);
  font-size: 14px;
  padding: 0 30px 0 35px;
  border: 1px solid #dddfe1;
  transition: 0.3s;
  border-radius: 6px;
  height: 40px;
}

.search-ctn input:focus {
  /* outline: none; */
  /* box-shadow: 0 0 0 0.2rem var(--primary-purple-bg); */
  border: var(--input-border-width) solid var(--primary-purple-outline) !important;
}

.search-ctn input:focus + label svg * {
  stroke: #7a62eb;
}

.search-ctn input:focus::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: var(--th-content-color);
  opacity: 1; /* Firefox */
}

.search-ctn input:focus:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--th-content-color);
}

.search-ctn input:focus::-ms-input-placeholder {
  /* Microsoft Edge */
  color: var(--th-content-color);
}

label {
  position: absolute;
  left: 10px;
}
label .loader {
  border-color: var(--border-one);
}
.cancel-btn {
  border: none;
  outline: none;
  appearance: none;
  display: grid;
  place-items: center;
  position: absolute;
  right: 8px;
}

input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  -webkit-appearance: none;
  appearance: none;
}
</style>
