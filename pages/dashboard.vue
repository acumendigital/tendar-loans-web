<template>
  <div class="main_ctn">
    <div class="top_section">
      <h1 class="title">Welcome Lanre</h1>
    </div>
    <div class="cards_section">
      <DashboardCard
        v-for="(data, index) in cardData"
        :key="index"
        :cardLength="index"
        :cardData="data"
      />
    </div>
    <TableTransactions :tableData="tableData" />
  </div>
</template>

<script setup>
import axios from "axios";
const toast = useToast();
const cardData = ref([
  {
    title: "Wallet balance",
    text: "₦17,250.00",
    date: "",
    active: "",
  },
  {
    title: "Next instalment due",
    text: "₦15,350.00",
    date: "Aug 30, 2023",
    active: "",
  },
  {
    title: "Number of payments",
    text: "1 of 4",
    date: "",
    active: "Active loan",
  },
]);
const tableData = ref([
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Successful",
  },
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Unsuccessful",
  },
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Successful",
  },
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Unsuccessful",
  },
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Successful",
  },
  {
    reference: "BN-B1E73DA–0017",
    transaction_type: "Wallet top-up",
    amount: "30000",
    date: "Dec 30, 09:42 PM",
    transaction_status: "Successful",
  },
]);

const loading = ref(false);

const getTransactions = () => {
  loading.value = true;
  axios
    .get('dashboard/transaction/list')
    .then((onfulfilled) => {
      console.log(onfulfilled);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

getTransactions();
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
</style>
