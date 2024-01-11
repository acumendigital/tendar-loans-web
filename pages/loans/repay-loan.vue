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
    <LoanApproved v-if="loanApproved" @close-modal="loanApproved = false" />
  </div>
</template>

<script setup>
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