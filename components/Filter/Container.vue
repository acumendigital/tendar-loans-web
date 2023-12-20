<template>
   <div class="filter">
    <OverlayScreen v-if="filterDropdownActive" @click="filterDropdownActive = false"/>
    <button
      :class="`default-input ${filterDropdownActive ? 'active' : ''}`"
      @click="filterDropdownActive = !filterDropdownActive"
    >
      <img src="@/assets/icons/filter-funnel.svg" alt="" />
      <span>Filter</span>
    </button>
    <div v-if="filterDropdownActive" class="filter-dropdown-ctn">
      <slot name="filterContent" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      filterDropdownActive: false
    }
  }
}
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 20;
  position: relative;
}

button.default-input {
  transform: none;
  box-shadow: 0px 5px 9px 2px rgb(69 104 209 / 6%);
}

.filter-dropdown-ctn {
  position: absolute;
  top: 110%;
  right: 0;
  width: 250%;
  min-width: 200px;
  box-shadow: var(--container-shadow);
  border: 1px solid rgba(221, 223, 225, 0.5);
  background: #fff;
  transform-origin: top;
  /* animation: squeeze-in 0.4s ease-in-out; */
  border-radius: 13px;
  z-index: 21;
}

.filter-dropdown-ctn > .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 50px;
  background: #f4f6fa;
  border-radius: 10px 10px 0 0;
}

.filter-dropdown-ctn > .filter-dropdown-content {
  background: #fff;
  border-radius: 0 0 13px 13px;
}

.filter-dropdown-ctn > .top .clear-btn,
.filter-dropdown-ctn > .top .done-btn {
  border-radius: 7px;
  padding: 3px 10px;
  height: 30px;
  font-size: 13px;
  font-weight: 500;
}

.filter-dropdown-ctn > .top .clear-btn {
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fff;
}

.filter-dropdown-ctn > .top .done-btn {
  border: 1px solid var(--primary-purple);
  background: var(--primary-purple);
  color: #fff;
}

.filter-dropdown-ctn .filter-item .top label {
  cursor: pointer;
}

.default-input.active {
  z-index: 21;
}

.filter-item input,
.filter-item select {
  outline: none;
  border: var(--input-border-width) solid var(--border-one);
  -webkit-border-radius: var(--input-border-radius);
  border-radius: var(--input-border-radius);
  -moz-border-radius: var(--input-border-radius);
  -ms-border-radius: var(--input-border-radius);
  -o-border-radius: var(--input-border-radius);
}

@keyframes expand-dropdown {
  0% {
    height: 0px;
    overflow: hidden;
  }
  99% {
    overflow: hidden;
  }
  100% {
    height: 100%;
    overflow: auto;
  }
}

@keyframes contract-dropdown {
  0% {
    height: 100%;
    overflow: hidden;
  }
  99% {
    overflow: hidden;
  }
  100% {
    height: 0px;
    overflow: hidden;
  }
}

</style>
