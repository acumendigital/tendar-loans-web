// import { defineStore } from "pinia"

// export const useCounterStore = defineStore("counter", () => {
//   const count = ref(0);
//   const name = ref("Eduardo");
//   const doubleCount = computed(() => count.value * 2);
//   function increment() {
//     count.value++;
//   }

//   return { count, name, doubleCount, increment };
// });

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
    },
    updateToken(val) {
      this.token = val;
      console.log("This Token -", this.token);
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
  },
  persist: true,
});
