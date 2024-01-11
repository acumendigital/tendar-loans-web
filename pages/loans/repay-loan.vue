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
      @proceed="enterPin()"
    />
    <ModalEnterPin
      v-if="openPinModal"
      @close-modal="openPinModal = false"
      @proceed="proceed()"
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
const encryptionKey = config.public.ENCRYPTION_KEY;

const openTransactionDetails = ref(false);
const openPinModal = ref(false);
const openSuccess = ref(false);
const amount_to_pay = ref(0);
const paymentOption = ref("");

const enterPin = () => {
  openTransactionDetails.value = false;
  openPinModal.value = true;
};

const transSuccess = () => {
  openPinModal.value = false;
  openSuccess.value = true;
};

const openDetails = (amount, option) => {
  amount_to_pay.value = amount;
  paymentOption.value = option;
  openTransactionDetails.value = true;
};

const proceed = (data) => {
  const encrptedPin = functions.encryptData(data, encryptionKey);
  if (paymentOption === "wallet") {
    payWithWallet(encrptedPin)
  } else if (paymentOption === "card") {
    payWithCard(encrptedPin);
  } else if (paymentOption === "online") {
    payOnline(encrptedPin);
  }
}

const payWithWallet = (pin) => {
  addCardLoading.value = true;
  const data = {
    pin: pin,
    loan_id: "657ba27c9ea1cc7a95c44e1a",
    amount: amount_to_pay.value,
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
      addCardLoading.value = false;
    });
};

const payWithCard = (pin) => {
  addCardLoading.value = true;
  const data = {
    pin: pin,
    loan_id: "657ba27c9ea1cc7a95c44e1a",
    amount: amount_to_pay.value,
    card_id: ''
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
      addCardLoading.value = false;
    });
};

const payOnline = (pin) => {
  addCardLoading.value = true;
  const data = {
    pin: pin,
    loan_id: "657ba27c9ea1cc7a95c44e1a",
    amount: amount_to_pay.value,
    success_url: "https://tendar-loans-web.vercel.app/loans",
    cancel_url: "https://tendar-loans-web.vercel.app/loans",
  };
  axios
    .post("loan/recollect/initiate", data)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      const checkoutRoute = onfulfilled.data.data.card.checkout_url;
      window.location.href = checkoutRoute;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      addCardLoading.value = false;
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
