<template>
  <div class="rhs">
    <button
      class="default-input"
      :disabled="currentPage === 1"
      @click="$emit('prev')"
    >
      Prev
    </button>
    <div v-if="totalPages <= 5" class="page-btns">
      <button
        v-for="page in totalPages"
        :key="page"
        class="default-input"
        :style="`${currentPage === page && 'color:#7a62eb'}`"
        @click="$emit('set-page', page)"
      >
        {{ page.toString().padStart(2, "0") }}
      </button>
    </div>
    <div v-else class="page-btns">
      <button
        class="default-input"
        :style="`${currentPage === 1 && 'color:#7a62eb'}`"
        @click="$emit('set-page', 1)"
      >
        01
      </button>
      <p v-if="currentPage !== 2 && currentPage !== 1 && prevPage !== 2">..</p>
      <button
        v-if="prevPage && prevPage !== 1"
        class="default-input"
        @click="$emit('set-page', prevPage)"
      >
        {{ prevPage.toString().padStart(2, "0") }}
      </button>
      <button
        v-if="currentPage !== 1"
        class="default-input"
        style="color: #7a62eb"
        @click="$emit('set-page', currentPage)"
      >
        {{ currentPage.toString().padStart(2, "0") }}
      </button>
      <button
        v-if="nextPage && nextPage !== totalPages"
        class="default-input"
        @click="$emit('set-page', nextPage)"
      >
        {{ nextPage.toString().padStart(2, "0") }}
      </button>
      <p
        v-if="
          nextPage !== totalPages - 1 &&
          nextPage !== totalPages &&
          prevPage !== totalPages - 1 &&
          currentPage !== totalPages
        "
      >
        ..
      </p>
      <button
        v-if="totalPages !== 1 && nextPage !== 0 && currentPage !== totalPages"
        class="default-input"
        :style="`${currentPage === totalPages && 'color:#7a62eb'}`"
        @click="$emit('set-page', totalPages)"
      >
        {{ totalPages.toString().padStart(2, "0") }}
      </button>
    </div>
    <button
      class="default-input"
      :disabled="currentPage === totalPages"
      @click="$emit('next')"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: () => 1,
    },
    totalPages: {
      type: Number,
      default: () => 1,
    },
    nextPage: {
      type: Number,
      default: () => 0,
    },
    prevPage: {
      type: Number,
      default: () => 0,
    },
  },
  data() {
    return {
      fivePages: [1, 2, 3, 4, 5],
    };
  },
  // computed: {},
  // methods: {},
};
</script>

<style scoped>
button.default-input:hover {
  transform: none;
}

/* .page-btns {
  display: flex;
} */
</style>
