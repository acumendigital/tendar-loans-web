export const useUserStore = defineStore("users", {
  state: () => ({
    token: "",
    apiToken: "",
    userData: {},
    userProfile: {},
    loanData: {},
    repaymentOption: [],
    loanAmount: 0,
    purposeForLoan: "",
    selectedRepaymentOption: {},
    setCard: false,
  }),
  actions: {
    resetStore() {
      this.token = "";
      this.apiToken = "";
      this.userData = {};
      this.userProfile = {};
      this.loanData = {};
      this.repaymentOption = [];
      this.loanAmount = 0;
      this.purposeForLoan = "";
      this.selectedRepaymentOption = {};
      this.setCard = false;
    },
    updateToken(val) {
      this.token = val;
    },
    updateApiToken(val) {
      this.apiToken = val;
    },
    updateUserData(val) {
      this.userData = val;
    },
    updateUserProfile(val) {
      this.userProfile = val;
    },
    updateLoanData(val) {
      this.loanData = val;
    },
    updateRepaymentOption(val) {
      this.repaymentOption = val;
    },
    updateLoanAmount(val) {
      this.loanAmount = val;
    },
    updatePurposeForLoan(val) {
      this.purposeForLoan = val;
    },
    updateSelectedRepaymentOption(val) {
      this.selectedRepaymentOption = val;
    },
    updateSetCard(val) {
      this.setCard = val;
    },
  },
  persist: true,
});
