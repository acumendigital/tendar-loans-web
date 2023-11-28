<template>
  <div>
    <div>
      <div class="title">Welcome Lanre</div>
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

<script>
export default {
  data() {
    return {
      cardData: [
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
      ],
      tableData: [
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
      ],
    };
  },
};
</script>

<style scoped>
.title {
  color: var(--dark-gray-dark-gray-2, #252c32);
  font-family: Inter;
  font-size: 24px;
  font-weight: 700;
}
.cards_section {
  display: flex;
}
</style>
