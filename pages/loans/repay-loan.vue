<template>
  <div>
    <div class="top_section">
      <h1 class="title">Repay loan</h1>
    </div>
    <div class="form-content">
      <LoanRepayLoan />
      <!-- <LoanProfileUpdate
        v-if="activeSection === 'Profile Update'"
        @continue="profileUpdateDone"
      />
      <LoanDetails
        v-if="activeSection === 'Loan Details'"
        @continue="LoanDetailsDone"
        @go-back="LoanDetailsBack"
      />
      <LoanRepaymentPlan
        v-if="activeSection === 'Repayment Plan'"
        @continue="repaymentPlanDone"
        @go-back="repaymentPlanBack"
      />
      <LoanReviewDetails
        v-if="activeSection === 'Review Details'"
        @continue="loanApproved = true"
        @go-back="reviewDetailsBack"
      /> -->
    </div>
    <LoanTransactionDetails
      v-if="openTransactionDetails"
      @close-modal="openTransactionDetails = false"
      @proceed="enterPin()"
    />
    <ModalWalletEnterPin
      v-if="openPinModal"
      @close-modal="openPinModal = false"
      @proceed="transSuccess()"
    />
    <ModalSuccess
      v-if="openSuccess"
      :type="'successful'"
      :title="'Transaction successful'"
      :subTitle="'Your loan has been repaid. Keep up the good work to get access to better options.'"
      @close-modal="openSuccess = false"
    />
  </div>
</template>

<script setup>
const openTransactionDetails = ref(true);
const openPinModal = ref(false);
const openSuccess = ref(false);

const enterPin = () => {
  openTransactionDetails.value = false;
  openPinModal.value = true;
};

const transSuccess = () => {
  openPinModal.value = false;
  openSuccess.value = true;
};

</script>

<style scoped>
.top_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  color: #252c32;
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
}

.form-content {
  background: #fff;
  width: 38vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 50px 30px 50px 50px;
  border-radius: 10px;
  margin-top: 4vh;
  margin-left: 5vw;
  border: 1px solid #d7e1ec;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */
  z-index: 1;
}
</style>
