<template>
  <div>
    <div class="top_section">
      <h1 class="title">Repay loan</h1>
    </div>
    <div class="form-content">
      <LoanRepayLoan @openDetails="openDetails" />
    </div>
    <LoanTransactionDetails
      v-if="openTransactionDetails"
      :amount="amount_to_pay"
      @close-modal="openTransactionDetails = false"
      @proceed="enterPin"
    />
    <ModalEnterPin
      v-if="openPinModal"
      :loading="loading"
      @close-modal="openPinModal = false"
      @proceed="proceed"
    />
    <ModalSuccess
      v-if="openSuccess"
      :type="'successful'"
      :title="'Transaction successful'"
      :subTitle="'Your loan has been repaid. Keep up the good work to get access to better options.'"
      @close-modal="openSuccess = false"
    />
  </div>
</template>

<script setup>
import axios from "axios";
const config = useRuntimeConfig();
const toast = useToast();
const route = useRoute();
const dataStore = useUserStore();
const encryptionKey = config.public.ENCRYPTION_KEY;

const loading = ref(false);
const openTransactionDetails = ref(false);
const openPinModal = ref(false);
const openSuccess = ref(false);
const amount_to_pay = ref(0);
const totalAmount = ref(0);
const paymentOption = ref("");
const carId = ref("");

const enterPin = (data) => {
  totalAmount.value = data;
  openTransactionDetails.value = false;
  if (!dataStore.userProfile.user.pin_set) {
    toast.add({ title: "Please set your PIN", color: "red" });
    navigateTo(`/user/create-pin?fallBackUrl=${window.location.pathname}`);
  } else {
    openPinModal.value = true;
  }
};

const transSuccess = () => {
  openPinModal.value = false;
  openSuccess.value = true;
};

const openDetails = (amount, option, id) => {
  amount_to_pay.value = amount;
  paymentOption.value = option;
  carId.value = id;
  openTransactionDetails.value = true;
};

const proceed = (data) => {
  const encrptedPin = functions.encryptData(data, encryptionKey);
  const loanid = route.query.id || dataStore.loanData.id;
  if (paymentOption.value === "wallet") {
    payWithWallet(encrptedPin, loanid);
  } else if (paymentOption.value === "card") {
    payWithCard(encrptedPin, loanid);
  } else if (paymentOption.value === "online") {
    payOnline(encrptedPin, loanid);
  }
};

const payWithWallet = (pin, id) => {
  loading.value = true;
  const data = {
    pin: pin,
    loan_id: id,
    amount: totalAmount.value,
  };
  axios
    .post("loan/recollect/wallet", data)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      transSuccess();
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const payWithCard = (pin, id) => {
  loading.value = true;
  const data = {
    pin: pin,
    loan_id: id,
    amount: totalAmount.value,
    card_id: carId.value,
  };
  axios
    .post("loan/recollect/card", data)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      transSuccess();
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const payOnline = (pin, id) => {
  loading.value = true;
  console.log(totalAmount.value);
  const data = {
    pin: pin,
    loan_id: id,
    amount: totalAmount.value,
    success_url: "https://tendar-loans-web.vercel.app/loans",
    cancel_url: "https://tendar-loans-web.vercel.app/loans",
  };
  axios
    .post("loan/recollect/initiate", data)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      const checkoutRoute = onfulfilled.data.data.recollection.checkout_url;
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

.form-content {
  background: #fff;
  width: 45vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 50px 30px 50px 50px;
  border-radius: 10px;
  margin-top: 4vh;
  margin-left: 5vw;
  border: 1px solid #d7e1ec;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */
  z-index: 1;
}
</style>
