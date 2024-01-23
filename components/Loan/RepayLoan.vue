<template>
  <div>
    <p class="welcome_text">Repay loan</p>
    <!-- <p class="instruction_text">
      Streamline your loan journey with a quick profile update!
    </p> -->
    <div class="form">
      <div>
        <label class="form_label" for="amount"
          >How much are you paying now?</label
        >
        <div class="select_amount_ctn">
          <div
            class="card_ctn"
            :class="payType === 'next-pay' ? 'active_card' : ''"
            @click="
              selectPayType(dataStore.loanData.next_pay_amount, 'next-pay')
            "
          >
            <div class="card_inner">
              <div class="lhs">
                <p class="card_title">Next repayment</p>
                <p class="card_subtitle">
                  {{
                    functions.formatMoney(
                      dataStore.loanData.next_pay_amount,
                      "NGN"
                    )
                  }}
                </p>
              </div>
              <div class="rhs">
                <svg
                  v-if="payType === 'next-pay'"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 12.6133C1 6.53815 5.92487 1.61328 12 1.61328C18.0751 1.61328 23 6.53815 23 12.6133C23 18.6884 18.0751 23.6133 12 23.6133C5.92487 23.6133 1 18.6884 1 12.6133Z"
                    fill="#7A62EB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3127 8.65625C17.7032 9.04677 17.7032 9.67994 17.3127 10.0705L11.1055 16.5705C10.715 16.961 10.0819 16.961 9.69133 16.5705L6.69133 13.5705C6.30081 13.1799 6.30081 12.5468 6.69133 12.1563C7.08185 11.7657 7.71502 11.7657 8.10554 12.1563L10.3984 14.4491L15.8984 8.65625C16.289 8.26573 16.9221 8.26573 17.3127 8.65625Z"
                    fill="white"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    opacity="0.2"
                    d="M1.23438 11.6133C1.23438 5.81429 5.93539 1.11328 11.7344 1.11328C17.5334 1.11328 22.2344 5.81429 22.2344 11.6133C22.2344 17.4123 17.5334 22.1133 11.7344 22.1133C5.93539 22.1133 1.23438 17.4123 1.23438 11.6133Z"
                    stroke="#888F9B"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div
            class="card_ctn"
            :class="payType === 'full-pay' ? 'active_card' : ''"
            @click="
              selectPayType(
                dataStore.loanData.amount_remaining_to_pay,
                'full-pay'
              )
            "
          >
            <div class="card_inner">
              <div class="lhs">
                <p class="card_title">Full repayment</p>
                <p class="card_subtitle">
                  {{
                    functions.formatMoney(
                      dataStore.loanData.amount_remaining_to_pay,
                      "NGN"
                    )
                  }}
                </p>
              </div>
              <div class="rhs">
                <svg
                  v-if="payType === 'full-pay'"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 12.6133C1 6.53815 5.92487 1.61328 12 1.61328C18.0751 1.61328 23 6.53815 23 12.6133C23 18.6884 18.0751 23.6133 12 23.6133C5.92487 23.6133 1 18.6884 1 12.6133Z"
                    fill="#7A62EB"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.3127 8.65625C17.7032 9.04677 17.7032 9.67994 17.3127 10.0705L11.1055 16.5705C10.715 16.961 10.0819 16.961 9.69133 16.5705L6.69133 13.5705C6.30081 13.1799 6.30081 12.5468 6.69133 12.1563C7.08185 11.7657 7.71502 11.7657 8.10554 12.1563L10.3984 14.4491L15.8984 8.65625C16.289 8.26573 16.9221 8.26573 17.3127 8.65625Z"
                    fill="white"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <path
                    opacity="0.2"
                    d="M1.23438 11.6133C1.23438 5.81429 5.93539 1.11328 11.7344 1.11328C17.5334 1.11328 22.2344 5.81429 22.2344 11.6133C22.2344 17.4123 17.5334 22.1133 11.7344 22.1133C5.93539 22.1133 1.23438 17.4123 1.23438 11.6133Z"
                    stroke="#888F9B"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <label class="form_label" for="amount"
        >Or set a specific amount below</label
      >
      <hr class="line" />
      <div class="form_group_flex">
        <div class="form-group">
          <label class="form_label" for="amount">Enter a specific amount</label>
          <Money3Component
            v-model.number="amount_to_pay"
            :prefix="'₦ '"
            @input="payType = ''"
          ></Money3Component>
          <div
            :class="
              submitClicked &&
              amount_to_pay < dataStore.loanData.next_pay_amount
                ? ''
                : 'not-vis'
            "
            class="error-text"
          >
            Minimum amount is
            {{
              functions.formatMoney(dataStore.loanData.next_pay_amount, "NGN")
            }}
          </div>
        </div>
        <p class="min_max">
          Min.
          <span class="min_man_bold">{{
            functions.formatMoney(dataStore.loanData.next_pay_amount, "NGN")
          }}</span>
          - Max.
          <span class="min_man_bold">{{
            functions.formatMoney(
              dataStore.loanData.amount_remaining_to_pay,
              "NGN"
            )
          }}</span>
        </p>
      </div>
      <div class="form_group_flex">
        <div class="modal-input-field">
          <label class="form_label" for="payment-option"
            >Select a payment option</label
          >
          <select
            id="payment-option"
            v-model="paymentOption"
            name="payment-option"
          >
            <option value="">Select</option>
            <option value="wallet">Pay with wallet</option>
            <option value="card">Pay with Card</option>
            <option value="online">Pay online</option>
          </select>
          <div
            :class="submitClicked && !paymentOption ? '' : 'not-vis'"
            class="error-text"
          >
            This field is required
          </div>
        </div>
        <p class=""></p>
      </div>
      <div class="btn-div">
        <button v-if="!loading" class="action-btn" @click="pay()">
          Securely pay {{ functions.formatMoney(amount_to_pay, "NGN") }}
        </button>
        <button v-else class="action-btn" disabled>
          <BtnLoader color="#fff" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Money3Component } from "v-money3";
import axios from "axios";
const toast = useToast();
const dataStore = useUserStore();
const emit = defineEmits(["continue", "openDetails"]);
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
});

const payType = ref("");
const paymentOption = ref("");
const amount_to_pay = ref("");
const loading = ref(false);
const submitClicked = ref(false);
const lowAmount = ref(true);

const selectPayType = (amount, type) => {
  console.log(amount);
  console.log(type);
  amount_to_pay.value = amount;
  payType.value = type;
};

const pay = () => {
  submitClicked.value = true;
  if (
    amount_to_pay.value >= dataStore.loanData.next_pay_amount &&
    paymentOption.value
  ) {
    emit("openDetails", amount_to_pay.value, paymentOption.value);
  }
};

// const lowAmount = computed(() => {
//   return amount_to_pay.value >= dataStore.loanData.next_pay_amount
// })
</script>

<style scoped>
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

.select_amount_ctn {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
}

.card_ctn {
  border-radius: 20px;
  background-color: #fff;
  padding: 25px 20px 25px 40px;
  width: 49%;
  cursor: pointer;
  border: 1px solid #888f9b29;
  /* margin-right: 2rem; */
}

.active_card {
  background-color: #7b62eb10;
  border-color: var(--primary-purple);
}

.card_inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card_title {
  color: #8b8f96;
  font-size: 14px;
  font-weight: 700;
}

.card_subtitle {
  color: #021c3e;
  font-size: 23px;
  font-weight: 700;
  margin: 5px 0;
}

.line {
  margin: 10px 0 20px 0;
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
  flex-basis: 60%;
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
.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.min_max {
  color: #464a53;
  font-size: 14px;
}

.min_man_bold {
  color: #464a53;
  font-size: 14px;
  font-weight: 700;
}

.action-btn {
  width: 70%;
  margin: auto;
  margin-top: 20px;
}
</style>
