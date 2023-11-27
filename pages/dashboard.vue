<template>
  <div>
    <div>
      <div class="title">Welcome Josh</div>
    </div>
    <div class="cards_section">
      <DashboardCard v-for="(data, index) in cardData" :key="index" :cardLength="index" :cardData="data" />
    </div>
    <TableTransactions />
  </div>
</template>

<script>
export default {
  data () {
    return {
      cardData: [
        {
          title: 'Wallet balance',
          text: '₦17,250.00',
          date: '',
          active: '',
        },
        {
          title: 'Next instalment due',
          text: '₦15,350.00',
          date: 'Aug 30, 2023',
          active: '',
        },
        {
          title: 'Number of payments',
          text: '1 of 4',
          date: '',
          active: 'Active loan',
        }
      ]
    }
  }
}
</script>

<style scoped>
.cards_section {
  display: flex;
}
</style>
