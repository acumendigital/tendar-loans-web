<template>
  <div class="alert_ctn" :class="props.overdueStatus === 'overdue' ? 'overdue' : ''">
    <span class="material-icons-outlined close" @click="$emit('close-modal')">
      close
    </span>
    <div class="inner">
      <div class="inner_lhs">
        <p v-if="props.overdueStatus === 'due'" class="overdue_text">
          Your next repayment of <span class="overdue_bold">{{ functions.formatMoney(props.amount, "NGN") }}</span> is due <span class="overdue_bold">{{ detailedDate(dueDate) }}</span> Please ensure
          your account is funded.
        </p>
        <p v-if="props.overdueStatus === 'overdue'" class="overdue_text">
          Your next repayment of <span class="overdue_bold">{{ functions.formatMoney(props.amount, "NGN") }}</span> is now <span class="overdue_bold">overdue.</span> Please ensure
          your account is funded.
        </p>
      </div>
      <button v-if="props.overdueStatus === 'due'" class="global_btn">Click here to pay early</button>
      <button v-else-if="props.overdueStatus === 'overdue'" class="global_btn overdue_btn">Click here to pay now</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  overdueStatus: {
    type: String,
    default: () => 'due'
  },
  amount: {
    type: String,
    default: () => ''
  },
  dueDate: {
    type: String,
    default: () => ''
  }
})
</script>

<style scoped>
.alert_ctn {
  position: relative;
  background-color: #f2effd;
  padding: 25px 55px 25px 25px;
  border-radius: 10px;
  width: 65%;
  margin-top: 30px;
}

.overdue {
  background-color: #FFF3F3;

}

.close {
  position: absolute;
  cursor: pointer;
  color: var(--primary-purple);
  right: 12px;
  top: 12px;
}

.overdue > .close {
  color: #D73C27;
}

.inner {
  display: flex;
  justify-content: space-between;
}

.inner_lhs {
  flex-basis: 50%;
}

.overdue_text {
  font-size: 14px;
  color: #464A53;
}

.overdue_bold {
  font-size: 14px;
  font-weight: 700;
  color: #464A53;
}

.global_btn {
  font-size: 14px;
}

.overdue_btn {
  background-color: #D73C27;
  border-color: #D73C27;
}
</style>
