<template>
  <div class="form-content">
    <div class="page-form-ctn">
      <div class="auth_top">
        <div class="lhs">
          <img
            class="company_logo"
            src="~assets/images/tendar_logo.png"
            alt=""
          />
        </div>
        <div class="rhs">
          <!-- <img
            class="payment_logo"
            src="~assets/images/stripe_logo.png"
            alt=""
          /> -->
        </div>
      </div>
      <p class="welcome_text">Add bank details</p>
      <p class="instruction_text">Enter your bank account details</p>
      <!-- <div class="signin-form-ctn"> -->
      <div class="form">
        <div class="form-group">
          <div class="flex">
            <label class="mr-[10px]" for="bank">Bank</label>
            <BtnLoader class="mt-[5px]" v-if="banksLoading" color="#7a62eb" size="15" />
          </div>
          <select
            id="bank"
            v-model="bank"
            name="bank"
            @change="selectBankName(bank)"
          >
            <option value="">Select</option>
            <option v-for="(data, index) in banks" :key="index" :value="data">
              {{ data.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="acct_num">Account number</label>
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
          <button v-if="!loading" class="action-btn" @click="addBankAccount()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text">I’ll do this later</p>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
definePageMeta({
  layout: "auth-layout",
});

const toast = useToast();
const holderName = ref("");
const accountNumber = ref("");
const banks = ref([]);
const bank = ref({});
const bankCode = ref("");
const bankName = ref("");
const accountName = ref("");
const accountLoading = ref(false);
const loading = ref(false);
const banksLoading = ref(false);

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
      navigateTo("/user/create-pin");
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

const getBanks = () => {
  banksLoading.value = true;
  axios
    .get("bank-account/bank/list")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      banks.value = onfulfilled.data.data.banks;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      banksLoading.value = false;
    });
};

getBanks();
</script>

<style scoped>
.form-content {
  background: #fff;
  width: 30vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 40px 30px 50px 50px;
  border-radius: 10px;
  margin-top: 5vh;
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center; */
  z-index: 1;
}
.auth_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
}
.welcome_text {
  color: #021c3e;
  font-size: 26px;
  font-weight: 700;
}

.company_logo {
  width: 50%;
}

.payment_logo {
  width: 60%;
  text-align: right;
}

.auth_text {
  color: #00000086;
  font-size: 16px;
  font-weight: 300;
}

.signup_btn {
  color: #7a62eb;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.instruction_text {
  color: #021c3e73;
}

.form {
  margin-top: 3vh;
  padding-right: 30px;
}

.forgot-pass-row,
.keep-signin {
  display: flex;
  align-items: center;
}

.forgot-pass-row {
  justify-content: space-between;
  margin: 25px 0;
  position: relative;
  width: 100%;
}

.keep-check {
  -moz-appearance: none;
  -webkit-appearance: none;
  -o-appearance: none;
  appearance: none;
  background-color: #f9fafc;
  outline: 1px solid #bcc7d3;
  border-radius: 3px;
  width: 20px;
  height: 20px;
}

a.forgot-text {
  cursor: pointer;
  font-size: 14px;
}
a.forgot-text:hover {
  text-decoration: underline;
  color: var(--primary-purple);
}

.keep-label {
  font-size: 14px;
}

.action-btn {
  width: 100%;
}

.action-btn:hover {
  border: 1px solid var(--primary-purple);
  background: var(--primary-purple);
  color: #fff;
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
</style>
