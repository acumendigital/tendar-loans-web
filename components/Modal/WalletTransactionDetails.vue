<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Transaction details</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">
        Please confirm the transaction details before payment
      </p>
      <div class="modal_content">
        <div class="content_ctn">
          <p class="text_content">Amount</p>
          <p class="value_content text-bold">{{ functions.formatMoney(props.amount, 'NGN') }}</p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Beneficiary</p>
          <p class="value_content">{{ props.bankData.account_name }}</p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Bank name</p>
          <p class="value_content">{{ props.bankData.bank_name }}</p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Transaction fee</p>
          <p class="value_content">{{ functions.formatMoney(transactionFee, 'NGN') }}</p>
        </div>
        <div class="content_ctn">
          <p class="text_content">Account number</p>
          <p class="value_content">{{ props.bankData.account_number }}</p>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="$emit('proceed')">
            Continue to payment
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const emit = defineEmits(["proceed"]);
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
  bankData: {
    type: Object,
    default: () => {},
  },
  amount: {
    type: Number,
    default: () => 0,
  },
});

const pin = ref("");
const loading = ref(false);
const transactionFee = ref(100);
const resendLoading = ref(false);

const handlePINChange = (value) => {
  pin.value = value;

  console.log(pin.value);
  if (pin.value.length === 4) {
    console.log(pin.value);
    // sendPin();
    emit("proceed");
  }
};

const createPin = () => {
  navigateTo("/settings?tab=Security&type=Pin");
};

const sendPin = () => {
  loading.value = true;
  const data = {
    email: email.value,
    token: otp.value,
  };
  const path = "user/email/verify";
  axios
    .post("user/email/verify", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      navigateTo("/user/create-profile");
    })
    .catch((_err) => {
      const errorMsg = _err?.response?.data?.message || _err?.message;
      if (errorMsg) {
        toast.add({ title: errorMsg, color: "red" });
      } else {
        toast.add({
          title: "Oops, something went wrong, please try again later",
          color: "red",
        });
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<style scoped>
.modal-backdrop {
  z-index: 50;
  position: fixed;
  overflow: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(24, 18, 46, 0.8);
}

.modal {
  /* margin-top: 5%; */
  position: relative;
  background-color: white;
  max-width: 550px;
  width: 35%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem;
}

.top_section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-top: 2rem;
}

.modal_subtitle {
  color: #808d9f;
  text-align: center;
  font-size: 16px;
  margin-bottom: 2rem;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #7a62eb;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  width: 100%;
  margin: auto;
}

.content_ctn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 20px 0;
}

.text_content {
  color: #6a707e;
  font-size: 14px;
}

.value_content {
  color: #01112c;
  font-size: 16px;
}

.btn-div {
  width: 80%;
  margin: auto;
  margin-top: 2rem;
}

@media only screen and (max-width: 1400px) {
  .modal {
    width: 50%;
  }
}

@media only screen and (max-width: 900px) {
  .modal {
    width: 70%;
  }
}

@media only screen and (max-width: 500px) {
  .modal {
    width: 90%;
    padding: 2rem;
    height: 80vh;
  }
}
</style>
