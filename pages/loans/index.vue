<template>
  <div>
    <div class="top_section">
      <h1 class="title">Loans</h1>
      <button class="global_btn" @click="requestLoan()">Request a loan</button>
    </div>
    <div class="cards_section">
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs next_instalment">
            <p class="card_title">Next instalment due</p>
            <p class="card_subtitle">
              {{ functions.formatMoney(repaymentData.next_due_amount, "NGN") }}
            </p>
            <div class="flex justify-between">
              <p v-if="repaymentData.next_due_date" class="card_text">
                {{ detailedDate(repaymentData.next_due_date) }}
              </p>
              <p
                v-if="loanData.active"
                :class="`pay_early ${
                  overdueStatus === 'overdue' ? 'payment_overdue' : ''
                }`"
                @click="navigateTo(`/loans/repay-loan?id=${loanId}`)"
              >
                {{
                  overdueStatus === "overdue" ? "Payment Overdue" : "Pay early"
                }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Active loan amount</p>
            <p class="card_subtitle">
              {{ functions.formatMoney(loanData.loan_amount, "NGN") }}
            </p>
          </div>
        </div>
      </div>
      <div class="card_ctn last_card">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Number of payments</p>
            <p
              v-if="repaymentData.no_of_active_repayment === 0"
              class="card_subtitle"
            >
              No active loan
            </p>
            <p v-else class="card_subtitle">
              {{ repaymentData.no_of_paid_repayment || 0 }} of
              {{ repaymentData.no_of_active_repayment || 0 }}
            </p>
          </div>
          <div v-if="loanData.active" class="rhs">
            <p class="active_badge">Active loan</p>
          </div>
        </div>
      </div>
    </div>
    <OverdueAlert
      v-if="overdueStatus"
      :overdueStatus="overdueStatus"
      :amount="repaymentData.next_due_amount"
      :dueDate="repaymentData.next_due_date"
      @close-modal="overdueStatus = ''"
      @payloan="navigateTo(`/loans/repay-loan?id=${loanId}`)"
    />
    <TableLoans @openSidebar="toggleSidebar" />
    <div class="sidebar_ctn">
      <DashboardTableDetails
        :isOpenProp="isOpen"
        :transactionId="transactionId"
        @update:isOpenProp="updateIsOpen"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const toast = useToast();
const dataStore = useUserStore();

const overdueStatus = ref("");
const loanId = ref("");
const loading = ref(false);
const showDetails = ref(true);
const analytics = ref({});
const walletData = ref({});
const loanData = ref({});
const repaymentData = ref({});
const isOpen = ref(false);
const transactionId = ref("");
const toggleSidebar = (val) => {
  isOpen.value = !isOpen.value;
  transactionId.value = val;
};
const updateIsOpen = (newVal) => {
  isOpen.value = newVal;
};

const requestLoan = () => {
  if (!dataStore.userProfile.user.identity_verified) {
    toast.add({ title: "Please verify your identity", color: "red" });
    navigateTo(`/user/verify-identity?from=${window.location.pathname}`);
  } else if (!dataStore.userProfile.user.profile_set) {
    toast.add({ title: "Please create your profile", color: "red" });
    navigateTo(`/user/create-profile?fallBackUrl=${window.location.pathname}`);
  } else if (!dataStore.userProfile.user.bank_account_set) {
    toast.add({ title: "Please add a bank account", color: "red" });
    navigateTo("/settings?tab=Bank+Account+Management");
  } else if (!dataStore.userProfile.user.card_set) {
    toast.add({ title: "Please add a card", color: "red" });
    navigateTo("/settings?tab=Cards");
  } else {
    navigateTo("/loans/request-loan");
  }
};

const getAnalytics = () => {
  loading.value = true;
  axios
    .get("loan/analytics")
    .then((onfulfilled) => {
      loanData.value = onfulfilled.data.data.loan;
      repaymentData.value = onfulfilled.data.data.repayment;
      getDueDate(repaymentData.value.next_due_date);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const getUserProfile = () => {
  loading.value = true;
  axios
    .get("customer/profile")
    .then((onfulfilled) => {
      const user_profile = onfulfilled.data.data.customer;
      dataStore.updateUserProfile(user_profile);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const getLoanData = () => {
  loading.value = true;
  axios
    .get("loan/list")
    .then((onfulfilled) => {
      const fullLoanData = onfulfilled.data.data.loans.data[0];
      loanId.value = fullLoanData?.id;
      dataStore.updateLoanData(fullLoanData);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const getDueDate = (date) => {
  if (date === null || date === undefined) {
    overdueStatus.value = "";
  } else {
    let date1 = new Date();
    let date2 = new Date(date);
    let difference_in_time = date2.getTime() - date1.getTime();

    let difference_in_days = Math.round(
      difference_in_time / (1000 * 3600 * 24)
    );

    if (difference_in_days === 7 || difference_in_days === 3) {
      overdueStatus.value = "due";
    } else if (difference_in_days <= 0) {
      overdueStatus.value = "overdue";
    }
  }
};

getUserProfile();
getLoanData();
getAnalytics();
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
.cards_section {
  display: flex;
}
.sidebar_ctn {
  z-index: 3;
}
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

.pay_early {
  color: var(--primary-purple);
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
}

.payment_overdue {
  color: #d73c27;
}

.next_instalment {
  width: 100%;
}
</style>
