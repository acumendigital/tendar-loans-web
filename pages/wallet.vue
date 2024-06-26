<template>
  <div>
    <div class="top_section">
      <h1 class="title">Wallet</h1>
      <!-- <button class="global_btn">Get a Loan</button> -->
    </div>
    <div class="cards_section">
      <div class="card_ctn">
        <div class="card_inner">
          <div class="lhs">
            <p class="card_title">Wallet balance</p>
            <p class="card_subtitle">
              {{
                showAmount
                  ? functions.formatMoney(
                      walletData.available_balance,
                      walletData.currency || "NGN"
                    )
                  : "*******"
              }}
              <span
                class="material-icons-outlined visibility"
                @click="showAmount = !showAmount"
              >
                {{ showAmount ? "visibility_off" : "visibility_on" }}
              </span>
            </p>
            <p class="card_text">
              Account number: <span class="acct_num">{{ accountNum }}</span
              ><span
                class="material-icons-outlined copy_icon"
                @click="copyAcctNum()"
              >
                content_copy
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="card_btn" @click="startTopup()">
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.0078 25.0273H33.6745"
            stroke="#7A62EB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M25.3438 33.362V16.6953"
            stroke="#7A62EB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M19.0911 45.862H31.5911C42.0078 45.862 46.1745 41.6953 46.1745 31.2786V18.7786C46.1745 8.36198 42.0078 4.19531 31.5911 4.19531H19.0911C8.67448 4.19531 4.50781 8.36198 4.50781 18.7786V31.2786C4.50781 41.6953 8.67448 45.862 19.0911 45.862Z"
            stroke="#7A62EB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p>Top up wallet</p>
      </div>
      <div class="card_btn" @click="startWithdrawal()">
        <svg
          width="51"
          height="51"
          viewBox="0 0 51 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.0911 45.862H31.5911C42.0078 45.862 46.1745 41.6953 46.1745 31.2786V18.7786C46.1745 8.36198 42.0078 4.19531 31.5911 4.19531H19.0911C8.67448 4.19531 4.50781 8.36198 4.50781 18.7786V31.2786C4.50781 41.6953 8.67448 45.862 19.0911 45.862Z"
            stroke="#7A62EB"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M18.6518 31.7193C18.4077 31.4752 18.4077 31.0795 18.6518 30.8354L30.0849 19.4023L22.2187 19.4023C21.8736 19.4023 21.5937 19.1225 21.5937 18.7773C21.5937 18.4322 21.8736 18.1523 22.2187 18.1523L31.5937 18.1523C31.9389 18.1523 32.2187 18.4322 32.2187 18.7773L32.2188 28.1523C32.2188 28.4975 31.9389 28.7773 31.5937 28.7773C31.2486 28.7773 30.9687 28.4975 30.9687 28.1523L30.9687 20.2862L19.5357 31.7193C19.2916 31.9634 18.8959 31.9634 18.6518 31.7193Z"
            fill="#7A62EB"
          />
        </svg>
        <p>Withdrawal</p>
      </div>
    </div>
    <TableWallet @openSidebar="toggleSidebar" />
    <div class="sidebar_ctn">
      <DashboardTableDetails
        :isOpenProp="isOpen"
        :transactionId="transactionId"
        @update:isOpenProp="updateIsOpen"
      />
    </div>
    <ModalWalletTopup
      v-if="openTopup"
      @close-modal="
        openTopup = false;
        navigateTo('/wallet');
      "
      @proceed="proceed"
    />
    <ModalWithdrawal
      v-if="openWithdrawal"
      :balance="walletData.available_balance"
      @close-modal="
        openWithdrawal = false;
        navigateTo('/wallet');
      "
      @proceed="transDetails"
    />
    <ModalWalletTransactionDetails
      v-if="openTransactionDetails"
      :bankData="bankData"
      :amount="withdrawAmount"
      @close-modal="openTransactionDetails = false"
      @proceed="enterPin()"
    />
    <ModalEnterPin
      v-if="openPinModal"
      :loading="loading"
      @close-modal="openPinModal = false"
      @proceed="transSuccess"
    />
    <ModalSuccess
      v-if="openSuccess"
      :title="'Transaction successful'"
      :subTitle="'You sent ₦10,000 to Leslie Alexander '"
      @close-modal="openSuccess = false"
    />
  </div>
</template>

<script setup>
import axios from "axios";
const dataStore = useUserStore();
import LogoVue from "~/components/Tendar/Logo.vue";
import { useClipboard, usePermission } from "@vueuse/core";
const config = useRuntimeConfig();
const route = useRoute();
const encryptionKey = config.public.ENCRYPTION_KEY;
const toast = useToast();
const { text, isSupported, copy } = useClipboard();
const openTopup = ref(route.query?.action === "topup" || false);
const openWithdrawal = ref(route.query?.action === "withdraw" || false);
const openTransactionDetails = ref(false);
const openPinModal = ref(false);
const openSuccess = ref(false);
const isOpen = ref(false);
const showAmount = ref(true);
const walletData = ref({});
const transactionId = ref("");
const amount = ref(null);
const withdrawAmount = ref(null);
const bankData = ref("");
const accountNum = ref("00123456789");

const copyAcctNum = () => {
  copy(accountNum.value);
  toast.add({
    title: "Account number copied",
    color: "green",
  });
};

const toggleSidebar = (val) => {
  isOpen.value = !isOpen.value;
  transactionId.value = val;
};
const updateIsOpen = (newVal) => {
  isOpen.value = newVal;
};

const proceed = (data) => {
  amount.value = data;
  if (!dataStore.userProfile.user.pin_set) {
    toast.add({ title: "Please set your PIN", color: "red" });
    navigateTo(`/user/create-pin?fallBackUrl=${window.location.pathname}`);
  } else {
    openTopup.value = false;
    openPinModal.value = true;
  }
};

const startTopup = () => {
  navigateTo({
    path: "/wallet",
    query: {
      action: "topup",
    },
  });
  openTopup.value = true;
};

const startWithdrawal = () => {
  navigateTo({
    path: "/wallet",
    query: {
      action: "withdraw",
    },
  });
  openWithdrawal.value = true;
};

const transDetails = (data, bank) => {
  withdrawAmount.value = data;
  bankData.value = bank;
  openWithdrawal.value = false;
  openTransactionDetails.value = true;
};

const enterPin = () => {
  if (!dataStore.userProfile.user.pin_set) {
    toast.add({ title: "Please set your PIN", color: "red" });
    navigateTo(`/user/create-pin?fallBackUrl=${window.location.pathname}`);
  } else {
    openTransactionDetails.value = false;
    openPinModal.value = true;
  }
};

const transSuccess = (data) => {
  const encrptedPin = functions.encryptData(data, encryptionKey);
  if (route.query?.action === "topup") {
    topupWallet(encrptedPin);
  } else if (route.query?.action === "withdraw") {
    widthdraw(encrptedPin);
  }
};

const loading = ref(false);

const getTransactions = () => {
  loading.value = true;
  axios
    .get("wallet/balance")
    .then((onfulfilled) => {
      walletData.value = onfulfilled.data.data.balance;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const topupWallet = (pin) => {
  loading.value = true;
  const data = {
    amount: amount.value,
    success_url: "https://tendar-loans-web.vercel.app/wallet",
    cancel_url: "https://tendar-loans-web.vercel.app/wallet",
    pin: pin,
  };
  axios
    .post("wallet/fund/initialize", data)
    .then((onfulfilled) => {
      const checkoutRoute = onfulfilled.data.data.transaction.checkout_url;
      window.location.href = checkoutRoute;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const widthdraw = (pin) => {
  loading.value = true;
  const data = {
    amount: withdrawAmount.value,
    beneficiary: bankData.value.id,
    pin: pin,
  };
  axios
    .post("wallet/transfer/initialize", data)
    .then((onfulfilled) => {
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
      // openPinModal.value = false;
      // openWithdrawal.value = true;
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
.sidebar_ctn {
  z-index: 3;
}

.card_ctn {
  border-radius: 10px;
  background-color: var(--primary-purple);
  padding: 25px 20px 25px 40px;
  width: 22rem;
  margin-right: 2rem;
}
.card_inner {
  display: flex;
  justify-content: space-between;
}

.card_title {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 3px;
}

.card_subtitle {
  color: #fff;
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.visibility {
  margin-left: 20px;
  color: white;
  cursor: pointer;
}

.card_text {
  color: #fff;
  font-size: 14px;
}

.acct_num {
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  margin-left: 7px;
}

.copy_icon {
  color: white;
  font-size: 16px;
  margin-left: 10px;
  cursor: pointer;
}

.card_btn {
  border-radius: 10px;
  background-color: #f2effd;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  cursor: pointer;
  margin-right: 2rem;
}

.card_btn p {
  margin-top: 13px;
  color: #10253e;
  font-size: 14px;
}
</style>
