<template>
  <div class="card_ctn" :class="cardLength == 2 ? 'last_card' : ''">
    <div class="card_inner">
      <div class="lhs">
        <p class="card_title">{{ title }}</p>
        <p class="card_subtitle">{{ cardData.available_balance || cardData.next_due_amount }}</p>
        <p v-if="cardData.date" class="card_text">{{ cardData.date }}</p>
      </div>
      <div v-if="cardData.active" class="rhs">
        <p class="active_badge">{{ cardData.active }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardLength: {
      type: Number,
      default: () => 0,
    },
    cardData: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: () => ''
    }
  },
};
</script>

<style scoped>
.card_ctn {
  border-radius: 4px;
  background-color: #7b62eb10;
  padding: 25px 20px 25px 40px;
  width: 22rem;
  margin-right: 2rem;
}

.last_card {
  background-color: transparent;
  border: 0.5px solid #021c3e33;
}
.card_inner {
  display: flex;
  justify-content: space-between;
}

.card_title {
  color: #8b8f96;
  font-size: 14px;
  font-weight: 700;
}

.card_subtitle {
  color: #021c3e;
  font-size: 23px;
  font-weight: 700;
  margin: 5px 0;
}

.card_text {
  color: #252c32;
  font-size: 14px;
}

.active_badge {
  color: #119c2b;
  background-color: #ebfff1;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
}
</style>
