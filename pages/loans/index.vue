<template>
  <div>
    <div class="top_section">
      <div class="title">Loans</div>
      <button class="global_btn" @click="navigateTo('/loans/request-loan')">Request a loan</button>
    </div>
    <div class="cards_section">
      <DashboardCard
        v-for="(data, index) in cardData"
        :key="index"
        :cardLength="index"
        :cardData="data"
      />
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

<script>
export default {
  data() {
    return {
      isOpen: false,
      cardData: [
        {
          title: "Next instalment due",
          text: "₦50,000.00",
          date: "Aug 30, 2023",
          active: "",
        },
        {
          title: "Active loan amount",
          text: "₦300,000.00",
          date: "",
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
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Ongoing",
        },
        {
          reference: "BN-B1E73DA–0017",
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Unsuccessful",
        },
        {
          reference: "BN-B1E73DA–0017",
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Completed",
        },
        {
          reference: "BN-B1E73DA–0017",
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Unsuccessful",
        },
        {
          reference: "BN-B1E73DA–0017",
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Completed",
        },
        {
          reference: "BN-B1E73DA–0017",
          amount_borrowed: "23000",
          amount_repaid: "30000",
          date_disbursed: "Aug 30, 2023",
          repayment_date: "Dec 30, 09:42 PM",
          transaction_status: "Completed",
        },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    updateIsOpen(newVal) {
      this.isOpen = newVal;
    },
  },
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
  color: var(#252c32);
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
</style>
