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
  }),
  actions: {
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
  },
  persist: true,
});
