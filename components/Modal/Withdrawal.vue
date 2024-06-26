<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Withdrawal</h1>
        <p class="modal_subtitle">Withdraw to your bank account</p>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">Available balance</p>
      <p class="amount_balance">
        {{ functions.formatMoney(props.balance, "NGN") }}
      </p>
      <div class="modal_content">
        <div class="form">
          <div class="form-group">
            <label for="">Amount</label>
            <Money3Component
              v-model.number="amount"
              :prefix="'₦ '"
            ></Money3Component>
            <div
              :class="submitClicked && !amount ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
            <div
              :class="submitClicked && amount > props.balance ? '' : 'not-vis'"
              class="error-text"
            >
              Amount is more than available balance
            </div>
          </div>
          <div class="modal-input-field">
            <div class="flex">
              <label class="form_label mr-[10px]" for="selectAccount"
                >Select Account</label
              >
              <BtnLoader
                class="mt-[5px]"
                v-if="bankAccountLoading"
                color="#7a62eb"
                size="15"
              />
            </div>
            <select
              id="selectAccount"
              v-model="selectAccount"
              name="selectAccount"
              @change="selectBank"
            >
              <option value="">Select</option>
              <option
                v-for="(bank, index) in bankAccounts"
                :key="index"
                :value="bank.id"
              >
                {{ bank.bank_name }}
              </option>
            </select>
            <!-- </div> -->
            <div
              :class="submitClicked && !selectAccount ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="btn-div">
            <button v-if="!loading" class="action-btn" @click="save">
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
import { Money3Component } from "v-money3";
const props = defineProps({
  balance: {
    type: Number,
    default: () => 0,
  },
});
const emit = defineEmits(["proceed"]);
const amount = ref("");
const selectAccount = ref("");
const loading = ref(false);
const bankAccountLoading = ref(false);
const submitClicked = ref(false);
const selectedBank = ref({});
const bankAccounts = ref([]);

const getSavedBanks = () => {
  bankAccountLoading.value = true;
  axios
    .get("bank-account/list")
    .then((onfulfilled) => {
      bankAccounts.value = onfulfilled.data.data.bank_accounts;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      bankAccountLoading.value = false;
    });
};

const selectBank = (data) => {
  const id = data.target.value;
  const bank = bankAccounts.value.find((val) => val.id === id);
  selectedBank.value = bank;
};

const save = () => {
  submitClicked.value = true;
  if (submitClicked && amount.value && amount.value <= props.balance && selectAccount.value) {
    emit("proceed", amount.value, selectedBank.value);
  }
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
  margin-bottom: 2rem;
  /* display: flex;
  justify-content: center;
  align-items: center; */
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-top: 1rem;
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
