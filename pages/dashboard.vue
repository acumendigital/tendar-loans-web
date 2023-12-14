<template>
  <div class="main_ctn">
    <div class="top_section">
      <h1 class="title">Welcome {{ dataStore.userProfile?.first_name}}</h1>
    </div>
    <div class="cards_section">
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Wallet balance</p>
            <p class="card_subtitle">{{ functions.formatMoney(walletData.available_balance, walletData.currency || 'NGN') }}</p>
          </div>
        </div>
      </div>
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Next instalment due</p>
            <p class="card_subtitle">{{ functions.formatMoney(repaymentData.next_due_amount, 'NGN') }}</p>
            <p v-if="repaymentData.next_due_date" class="card_text">{{ repaymentData.next_due_date }}</p>
          </div>
        </div>
      </div>
      <div class="card_ctn last_card">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Number of payments</p>
            <p class="card_subtitle">{{ repaymentData.no_of_paid_repayment }} of {{ repaymentData.no_of_active_repayment }}</p>
          </div>
          <div v-if="!loanData.active" class="rhs">
            <p class="active_badge">Active loan</p>
          </div>
        </div>
      </div>
    </div>
    <TableTransactions />
  </div>
</template>

<script setup>
import axios from "axios";
import { useUserStore } from "~/stores";
const toast = useToast();
const dataStore = useUserStore();

const loading = ref(false);
const analytics = ref({});
const walletData = ref({});
const loanData = ref({});
const repaymentData = ref({});

const getUserProfile = () => {
  loading.value = true;
  axios
    .get("customer/profile")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      const user_profile = onfulfilled.data.data.customer;
      dataStore.updateUserProfile(user_profile);
      console.log(dataStore.userProfile.first_name);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};
const getAnalytics = () => {
  loading.value = true;
  axios
    .get("dashboard/analytics/fetch")
    .then((onfulfilled) => {
      // console.log(onfulfilled);
      analytics.value = onfulfilled.data.data;
      walletData.value = onfulfilled.data.data.wallet;
      loanData.value = onfulfilled.data.data.loan;
      repaymentData.value = onfulfilled.data.data.repayment;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

getAnalytics();
getUserProfile();
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
