<template>
  <div class="form-content">
    <div class="ctn">
      <p class="welcome_text">Review loan details</p>
      <p class="instruction_text">
        Discover tailored loan solutions for your every need
      </p>
      <div class="form">
        <div class="contents">
          <div class="content">
            <p class="content_title">Loan Amount</p>
            <p class="content_value bold_text">{{ functions.formatMoney(loanAmount, 'NGN') }}</p>
          </div>
          <div class="content">
            <p class="content_title">Amount to be repaid</p>
            <p class="content_value bold_text">{{ functions.formatMoney(repaymentData.total_repayment, 'NGN') }}</p>
          </div>
          <div class="content">
            <p class="content_title">Frequency</p>
            <p class="content_value">{{ functions.capitalizeFirstLetter(repaymentData.frequency_type) }}</p>
          </div>
          <div class="content">
            <p class="content_title">Interest rate</p>
            <p class="content_value">{{ repaymentData.interest_rate }}%</p>
          </div>
          <div class="content">
            <p class="content_title">Duration</p>
            <p class="content_value">{{ repaymentData.duration }}
                  {{
                    repaymentData.duration_type === "yearly"
                      ? "year"
                      : repaymentData.duration_type === "monthly"
                        ? "month"
                        : repaymentData.duration_type === "weekly"
                          ? "week"
                          : repaymentData.duration_type === "daily"
                            ? "day"
                            : ""
                  }}{{ repaymentData.duration > 1 ? "s" : "" }}</p>
          </div>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="$emit('continue')">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="$emit('go-back')">Back</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const dataStore = useUserStore();

const repaymentData = ref(dataStore.selectedRepaymentOption || {});
const loanAmount = ref(dataStore.loanAmount || 0);
const loading = ref(false);

</script>

<style scoped>
.ctn {
  padding: 0 4rem;
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

.welcome_text {
  color: #021c3e;
  font-size: 26px;
  font-weight: 700;
}

.instruction_text {
  color: #021c3e73;
}

.form {
  margin-top: 3vh;
  padding-right: 30px;
}

.contents {
  display: flex;
  flex-wrap: wrap;
}

.content {
  flex-basis: 45%;
  margin-bottom: 25px;
}

.content_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
}

.content_value {
  color: #6a707e;
  font-size: 16px;
  font-weight: 500;
}

.bold_text {
  color: #10253e;
  font-size: 19px;
  font-weight: 700;
}
</style>
