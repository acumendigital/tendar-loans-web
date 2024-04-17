<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Add new bank</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">Enter your new bank account details below</p>
      <div class="modal_content">
        <div class="form">
          <div class="modal-input-field">
            <label class="form_label" for="bank">Bank</label>
            <v-select
              v-model="bank"
              :options="banks"
              label="name"
              @change="selectBankName(bank)"
            ></v-select>
            <!-- <select
              id="bank"
              v-model="bank"
              name="bank"
              @change="selectBankName(bank)"
            >
              <option value="">Select</option>
              <option v-for="(data, index) in banks" :key="index" :value="data">
                {{ data.name }}
              </option>
            </select> -->
            <!-- </div> -->
            <!-- <div
              :class="submitClicked && !bank ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
          </div>
          <div class="form-group">
            <label for="">Account Number</label>
            <input
              class="amount_input"
              id="accountNumber"
              v-model="accountNumber"
              type="text"
              name="accountNumber"
              placeholder="Enter your Account Number"
              @input="countAcctNum"
            />
          </div>
          <div class="form-group">
            <label for="">Account holder name</label>
            <div class="holder_input">
              <p>{{ holderName }}</p>
              <BtnLoader v-if="accountLoading" color="#7a62eb" size="20" />
            </div>
          </div>
          <div class="btn-div">
            <button
              v-if="!loading"
              class="action-btn"
              @click="addBankAccount()"
            >
              Continue
            </button>
            <button v-else class="action-btn" disabled>
              <BtnLoader color="#fff" />
            </button>
          </div>
          <!-- <p class="link_text" @click="$emit('close-modal')">
          Cancel
        </p> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const emit = defineEmits(["close-modal"]);

const props = defineProps({
  banks: {
    type: Array,
    default: () => [],
  },
});

const toast = useToast();
const holderName = ref("");
const accountNumber = ref("");
const bank = ref({});
const bankCode = ref("");
const bankName = ref("");
const accountName = ref("");
const accountLoading = ref(false);
const loading = ref(false);

const countAcctNum = (val) => {
  if (val.target.value.length === 10) {
    getAccount();
  }
};

const selectBankName = (val) => {
  console.log(val);
  bankCode.value = val.code;
  bankName.value = val.name;
};

const getAccount = () => {
  accountLoading.value = true;
  const data = {
    account_number: accountNumber.value,
    bank_code: bankCode.value,
  };
  axios
    .post("bank-account/account-number/resolve", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      holderName.value = onfulfilled.data.data.account.account_name;
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
      accountLoading.value = false;
    });
};

const addBankAccount = () => {
  loading.value = true;
  const data = {
    account_name: holderName.value,
    bank_name: bankName.value,
    account_number: accountNumber.value,
    bank_code: bankCode.value,
    currency: "NGN",
  };
  axios
    .post("bank-account/create", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      toast.add({ title: "Bank Account Added", color: "green" });
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
  width: 30%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem 60px;
}

.top_section {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  /* text-align: center; */
  font-size: 26px;
  font-weight: 700;
  margin-top: 1.5rem;
}

.modal_subtitle {
  color: #808d9f;
  /* text-align: center; */
  font-size: 16px;
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

.form {
  margin-top: 4vh;
}

.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.holder_input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-radius: var(--input-border-radius);
  background: var(--input-bg);
  width: 100%;
  height: 45px;
  border: var(--input-border-width) solid var(--border-two);
}

.holder_input p {
  font-size: 14px;
  line-height: 17px;
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
