<template>
  <div>
    <div class="top_section">
      <h1 class="title">Request a loan</h1>
    </div>
    <LoanProfileUpdate
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
      @continue="openPinModal = true"
      @go-back="reviewDetailsBack"
    />
    <ModalEnterPin
      v-if="openPinModal"
      :loading="loading"
      @close-modal="openPinModal = false"
      @proceed="transSuccess"
    />
    <LoanApproved v-if="loanApproved" @close-modal="loanApproved = false" />
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();
const config = useRuntimeConfig();
const encryptionKey = config.public.ENCRYPTION_KEY;

const activeSection = ref(route.query?.section || "Profile Update");
const openPinModal = ref(false);
const loanApproved = ref(false);
const loading = ref(false);
const amount = ref(0);
const purpose = ref("");
const repaymentAmount = ref(0);
const duration = ref("");
const duration_type = ref("");
const frequency = ref("");
const frequency_type = ref("");
const instrest_rate = ref("");
const interest_type = ref("");

const updateRoute = (val) => {
  navigateTo({
    path: "/loans/request-loan",
    query: {
      section: val,
    },
  });
};

const profileUpdateDone = () => {
  activeSection.value = "Loan Details";
  updateRoute(activeSection.value);
};

const LoanDetailsDone = () => {
  activeSection.value = "Repayment Plan";
  updateRoute(activeSection.value);
};

const repaymentPlanDone = () => {
  activeSection.value = "Review Details";
  updateRoute(activeSection.value);
};

const LoanDetailsBack = () => {
  activeSection.value = "Profile Update";
  updateRoute(activeSection.value);
};

const repaymentPlanBack = () => {
  activeSection.value = "Loan Details";
  updateRoute(activeSection.value);
};

const reviewDetailsBack = () => {
  activeSection.value = "Repayment Plan";
  updateRoute(activeSection.value);
};

const transSuccess = (data) => {
  openPinModal.value = false;
  const encrptedPin = functions.encryptData(data, encryptionKey);
  requestLoan(encrptedPin);
};

const requestLoan = (pin) => {
  loading.value = true;
  const data = {
    pin: pin,
    amount: amount.value,
    duration_type: duration_type.value,
    duration: duration.value,
    frequency_type: frequency_type.value,
    frequency: frequency.value,
    interest_rate: instrest_rate.value,
    interest_type: interest_type.value,
    purpose: purpose.value,
  };
  axios
    .post("loan/request", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      loanApproved.value = true;
    })
    .catch((_err) => {
      const errorMsg = _err?.response?.data?.message || _err?.message;
      if (errorMsg) {
        toast.add({ title: errorMsg, color: "red" });
      } else {
        toast.add({
          title: "Oops, something went wrong, please try again later",
          color: "red",
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
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
.form_group_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form_group_flex div {
  flex-basis: 48%;
  margin-top: 0;
}
.form-group {
  margin-top: 0;
}

.form_label {
  margin-bottom: 10px;
  color: #464a53 !important;
  font-size: 14px;
  font-weight: 400;
}
.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}
</style>
