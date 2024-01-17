<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Withdrawal</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">Available balance</p>
      <p class="amount_balance">{{ functions.formatMoney(props.balance, 'NGN')  }}</p>
      <div class="modal_content">
        <div class="form">
          <div class="form-group">
            <label for="">Amount</label>
            <input
              class="amount_input"
              id="amount"
              v-model="amount"
              type="number"
              name="amount"
              placeholder="Enter your Amount"
            />
          </div>
          <div class="modal-input-field">
            <label class="form_label" for="selectAccount">Select Account</label>
            <select
              id="selectAccount"
              v-model="selectAccount"
              name="selectAccount"
              @change="selectBank"
            >
              <option value="">Select</option>
              <option v-for="(bank, index) in bankAccounts" :key="index" :value="bank.id">{{ bank.bank_name }}</option>
            </select>
            <!-- </div> -->
            <!-- <div
              :class="submitClicked && !selectAccount ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
          </div>
          <div class="btn-div">
            <button
              v-if="!loading"
              class="action-btn"
              @click="$emit('proceed', amount, selectedBank)"
            >
              Proceed
            </button>
            <button v-else class="action-btn" disabled>
              <BtnLoader color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const props = defineProps({
  balance: {
    type: Number,
    default: () => 0
  }
})
const amount = ref("");
const selectAccount = ref("");
const loading = ref(false);
const selectedBank = ref({});
const bankAccounts = ref([]);

const getSavedBanks = () => {
  loading.value = true;
  axios
    .get("bank-account/list")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      bankAccounts.value = onfulfilled.data.data.bank_accounts;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const selectBank = (data) => {
  console.log(data.target.value);
  const id = data.target.value;
  const bank = bankAccounts.value.find((val) => val.id === id )
  console.log(bank);
  selectedBank.value = bank
}

const sendOtp = () => {
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

getSavedBanks();
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
  width: 30%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem 60px;
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
  font-size: 30px;
  font-weight: 700;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.modal_subtitle {
  color: #808d9f;
  text-align: center;
  font-size: 16px;
}

.amount_balance {
  color: #464a53;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #7a62eb;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  margin-top: 10px;
}

.input_ctn {
  width: 100%;
  margin-bottom: 20px;
}

.input_flex_item {
  flex-basis: 48%;
}

.global_btn {
  width: 100%;
  margin-top: 2rem;
}

.bottom_link {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.bottom_text {
  color: #00000086;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}

.resend_btn {
  color: #7a62eb;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
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
