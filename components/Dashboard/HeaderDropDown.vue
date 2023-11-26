<template>
  <div class="action-filter">
    <OverlayScreen v-if="dropDownShow" @click="dropDownShow = false" />
    <button
      :class="['default-input profile', dropDownShow && 'expanded']"
      @click="dropDownShow = !dropDownShow"
    >
      <p>{{ "Josh Anaba" }}</p>
      <span class="material-icons-outlined profile-icon">account_circle</span>
      <span class="material-icons-outlined"> expand_more </span>
    </button>
    <div v-show="dropDownShow" class="action-filter-drop-down">
      <slot name="body" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropDownShow: false,
    };
  },
  computed: {},
  methods: {
    setDropDownToFalse() {
      setTimeout(() => {
        this.dropDownShow = false;
      }, 300);
    },
  },
};
</script>

<style scoped>
.action-filter {
  position: relative;
}

.action-filter > button {
  border: none;
}

.profile {
  border-radius: 6px;
}

.profile .avatar {
  min-width: 35px;
  max-width: 35px;
  min-height: 35px;
  max-height: 35px;
  border-radius: 50%;
  border: 2px solid var(--primary-purple);
  object-fit: cover;
}

.profile .material-icons-outlined.profile-icon {
  font-size: 35px;
  color: var(--primary-purple);
}

.action-filter > .default-input {
  gap: 5px;
  justify-content: flex-end;
  padding: 0;
  min-width: fit-content;
  transform: none;
  padding: 0 5px;
}

.action-filter > .default-input:hover {
  background: var(--clear-btn-hover);
}

.action-filter > .default-input p {
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  margin-right: 3px;
}

.action-filter > .default-input span:not(.material-icons-outlined) {
  color: #9097a5;
}

.action-filter > .default-input .material-icons-outlined {
  transition: 0.3s;
}

.action-filter
  > .default-input.expanded
  .material-icons-outlined:not(.profile-icon) {
  transform: rotate(180deg);
}

.action-filter > .default-input.expanded {
  background: rgba(136, 143, 155, 0.1);
}

.action-filter-drop-down {
  position: absolute;
  width: 150px;
  top: 50px;
  /* left: -60px; */
  right: 0;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  /* box-shadow: var(--container-shadow); */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #dddfe180;
  background: #fff;
  transform-origin: top;
  animation: dropdown 0.4s ease-in-out;
  z-index: 50;
  /* display: none; */
}

/* .action-filter-drop-down:hover {
  display: flex;
}

.action-filter > .default-input:focus + .action-filter-drop-down {
  display: flex;
} */

.action-filter-drop-down > .action-item {
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 500;
  z-index: 20;
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-light);
}

.action-filter-drop-down > .action-item:hover {
  color: var(--primary-purple);
}

.action-filter-drop-down > .action-item:not(:last-child) {
  border-bottom: 1px solid #dddfe180;
}

.action-filter-drop-down > .action-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.action-filter-drop-down > .action-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  /* color: var(--failure); */
  background: linear-gradient(to right, var(--failure) 50%, #fff 50%);
  background-size: 210% 100%;
  background-position: right bottom;
}

.action-filter-drop-down > .action-item:last-child:hover {
  /* background: var(--failure); */
  color: #fff;
  background-position: left bottom;
}
</style>
