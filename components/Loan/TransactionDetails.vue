<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Transaction details</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">
        You are about to make a loan repayment of <span class="text-bold">{{ functions.formatMoney(props.amount, "NGN") }}</span>
      </p>
      <div class="modal_content">
        <div class="content_ctn">
          <p class="text_content">Amount</p>
          <p class="value_content">
            {{ functions.formatMoney(props.amount, "NGN") }}
          </p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Service fee</p>
          <p class="value_content">
            {{ functions.formatMoney(serviceFee, "NGN") }}
          </p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Late repayment fee</p>
          <p class="value_content">
            {{ functions.formatMoney(lateRepaymentFee, "NGN") }}
          </p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Total amount</p>
          <p class="value_content text-bold">
            {{ functions.formatMoney(totalAmount, "NGN") }}
          </p>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="$emit('proceed', totalAmount)">
            Continue to payment
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const emit = defineEmits(["proceed"]);
const props = defineProps({
  amount: {
    type: Number,
    default: () => 0,
  },
});

const serviceFee = ref(100);
const lateRepaymentFee = ref(0);
const totalAmount = ref(0);
const pin = ref("");
const loading = ref(false);
const resendLoading = ref(false);

const calculateTotal = () => {
  totalAmount.value = props.amount + serviceFee.value + lateRepaymentFee.value;
};

calculateTotal();
</script>

<style scoped>
.modal-backdrop {
  z-index: 50;
  position: fixed;
  overflow: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(24, 18, 46, 0.8);
}

.modal {
  /* margin-top: 5%; */
  position: relative;
  background-color: white;
  max-width: 550px;
  width: 35%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem;
}

.top_section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-top: 2rem;
}

.modal_subtitle {
  color: #808d9f;
  text-align: center;
  font-size: 16px;
  margin-bottom: 2rem;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #7a62eb;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  width: 100%;
  margin: auto;
}

.content_ctn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 0;
}

.text_content {
  color: #6a707e;
  font-size: 14px;
}

.value_content {
  color: #01112c;
  font-size: 16px;
}

.btn-div {
  width: 80%;
  margin: auto;
  margin-top: 2rem;
}

@media only screen and (max-width: 1400px) {
  .modal {
    width: 50%;
  }
}

@media only screen and (max-width: 900px) {
  .modal {
    width: 70%;
  }
}

@media only screen and (max-width: 500px) {
  .modal {
    width: 90%;
    padding: 2rem;
    height: 80vh;
  }
}
</style>
