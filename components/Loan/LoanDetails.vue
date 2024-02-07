<template>
  <div class="form-content">
    <div class="ctn">
      <p class="welcome_text">Loan details</p>
      <p class="instruction_text">
        Discover tailored loan solutions for your every need
      </p>
      <div class="info_box">
        <p>
          Based on our assessment, this is the highest amount we can offer you
          for now
        </p>
        <div
          v-if="!loanAmountLoading"
          class="amount_box"
          @click="amount = highestAmount"
        >
          <p>{{ functions.formatMoney(highestAmount, "NGN") }}</p>
        </div>
        <div v-else class="amount_box">
          <BtnLoader color="#fff" size="20" />
        </div>
      </div>
      <div class="form">
        <div class="form-group">
          <label for="">How much do you want to borrow?</label>
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
        </div>
        <div class="modal-input-field">
          <label class="form_label" for="reasonForLoan">Reason for loan</label>
          <select
            id="reasonForLoan"
            v-model="reasonForLoan"
            name="reasonForLoan"
          >
            <option value="">Select</option>
            <option value="schoolFees">School Fees</option>
            <option value="insurance">Insurance</option>
            <option value="health">Health</option>
            <option value="realEstate">Real Estate</option>
            <option value="rent">Rent</option>
            <option value="car">Car</option>
            <option value="land">Land</option>
            <option value="other">Other</option>
          </select>
          <!-- </div> -->
          <div
            :class="submitClicked && !reasonForLoan ? '' : 'not-vis'"
            class="error-text"
          >
            This field is required
          </div>
        </div>
        <div v-if="reasonForLoan === 'other'" class="form-group">
          <label class="form_label" for="address"
            >Other (reason for loan)</label
          >
          <input
            id="other"
            v-model="other"
            type="text"
            name="other"
            placeholder="Enter your reason for loan"
          />
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="$emit('go-back')">Back</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Money3Component } from "v-money3";
import axios from "axios";
const emit = defineEmits(["continue"]);
const dataStore = useUserStore();

const amount = ref("");
const reasonForLoan = ref("");
const other = ref("");
const highestAmount = ref(null);
const submitClicked = ref(false);
const loading = ref(false);
const loanAmountLoading = ref(false);

const getLoanAmount = () => {
  loanAmountLoading.value = true;
  axios
    .get("loan/amount")
    .then((onfulfilled) => {
      // console.log(onfulfilled);
      highestAmount.value = onfulfilled?.data?.data.loan_amount.amount;
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
      loanAmountLoading.value = false;
    });
};

const save = () => {
  submitClicked.value = true;
  if (amount.value && reasonForLoan.value) {
    loading.value = true;
    const data = {
      amount: amount.value,
      currency: "NGN",
    };
    console.log(data);
    axios
      .post("loan/repayment-option", data)
      .then((onfulfilled) => {
        console.log(onfulfilled.data.data.repayment_option);
        const repaymentOption = onfulfilled?.data?.data.repayment_option;
        dataStore.updateRepaymentOption(repaymentOption);
        dataStore.updateLoanAmount(amount.value);
        dataStore.updatePurposeForLoan(reasonForLoan.value);
        const reason =
          reasonForLoan.value === "other" ? other.value : reasonForLoan.value;
        emit("continue", reason);
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
  }
};

getLoanAmount();
</script>

<style scoped>
.ctn {
  padding: 0 3rem;
}
.form-content {
  background: #fff;
  width: 38vw;
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

.welcome_text {
  color: #021c3e;
  font-size: 26px;
  font-weight: 700;
}

.instruction_text {
  color: #021c3e73;
}

.info_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background-color: #f2effd;
  padding: 20px;
  margin-top: 30px;
}

.info_box > p {
  color: #464a53;
  font-size: 13px;
  flex-basis: 65%;
}

.amount_box {
  min-width: 7rem;
  min-height: 3rem;
  border-radius: 5px;
  background: #7a62eb;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.amount_box > p {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
}
.form {
  margin-top: 3vh;
  padding-right: 30px;
}
.form_group_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form_group_flex div {
  flex-basis: 48%;
  margin-top: 0;
}
.form-group {
  margin-top: 0;
}

.form_label {
  margin-bottom: 10px;
  color: #464a53 !important;
  font-size: 14px;
  font-weight: 400;
}

.amount_input {
  width: 75%;
}
</style>
