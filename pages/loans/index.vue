<template>
  <div>
    <div class="top_section">
      <h1 class="title">Loans</h1>
      <button class="global_btn" @click="navigateTo('/loans/request-loan')">
        Request a loan
      </button>
    </div>
    <div class="cards_section">
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Wallet balance</p>
            <p class="card_subtitle">
              {{
                functions.formatMoney(
                  walletData.available_balance,
                  walletData.currency || "NGN"
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Next instalment due</p>
            <p class="card_subtitle">
              {{ functions.formatMoney(repaymentData.next_due_amount, "NGN") }}
            </p>
            <p v-if="repaymentData.next_due_date" class="card_text">
              {{ detailedDate(repaymentData.next_due_date) }}
            </p>
          </div>
        </div>
      </div>
      <div class="card_ctn last_card">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Number of payments</p>
            <p class="card_subtitle">
              {{ repaymentData.no_of_paid_repayment }} of
              {{ repaymentData.no_of_active_repayment }}
            </p>
          </div>
          <div v-if="!loanData.active" class="rhs">
            <p class="active_badge">Active loan</p>
          </div>
        </div>
      </div>
    </div>
    <TableLoans :tableData="tableData" @openSidebar="toggleSidebar" />
    <div class="sidebar_ctn">
      <DashboardTableDetails
        :isOpenProp="isOpen"
        @update:isOpenProp="updateIsOpen"
      />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const toast = useToast();

const loading = ref(false);
const analytics = ref({});
const walletData = ref({});
const loanData = ref({});
const repaymentData = ref({});
const isOpen = ref(false);
const toggleSidebar = (val) => {
  isOpen.value = !isOpen.value;
  transactionId.value = val;
};
const updateIsOpen = (newVal) => {
  isOpen.value = newVal;
};

const getAnalytics = () => {
  loading.value = true;
  axios
    .get("loan/analytics")
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
// export default {
//   data() {
//     return {
//       isOpen: false,
//       cardData: [
//         {
//           title: "Next instalment due",
//           text: "₦50,000.00",
//           date: "Aug 30, 2023",
//           active: "",
//         },
//         {
//           title: "Active loan amount",
//           text: "₦300,000.00",
//           date: "",
//           active: "",
//         },
//         {
//           title: "Number of payments",
//           text: "1 of 4",
//           date: "",
//           active: "Active loan",
//         },
//       ],
//       tableData: [
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Ongoing",
//         },
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Unsuccessful",
//         },
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Completed",
//         },
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Unsuccessful",
//         },
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Completed",
//         },
//         {
//           reference: "BN-B1E73DA–0017",
//           amount_borrowed: "23000",
//           amount_repaid: "30000",
//           date_disbursed: "Aug 30, 2023",
//           repayment_date: "Dec 30, 09:42 PM",
//           transaction_status: "Completed",
//         },
//       ],
//     };
//   },
//   methods: {
//     toggleSidebar() {
//       this.isOpen = !this.isOpen;
//     },
//     updateIsOpen(newVal) {
//       this.isOpen = newVal;
//     },
//   },
// };
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
</style>
