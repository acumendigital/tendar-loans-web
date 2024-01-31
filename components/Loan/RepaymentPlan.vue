import type { duration } from 'moment';
<template>
  <div class="repayment_ctn">
    <p class="welcome_text">Repayment plan</p>
    <!-- <p class="instruction_text">
      Discover tailored loan solutions for your every need
    </p> -->
    <div class="form">
      <div>
        <p class="content_title">Loan Amount</p>
        <p class="content_value bold_text">
          {{ functions.formatMoney(loanAmount, "NGN") }}
        </p>
      </div>
      <div class="loan_options">
        <p class="content_title">Select your preferred option below</p>
        <div
          v-for="(option, index) in repaymentData"
          :key="index"
          class="option flex items-start"
          :class="`${seletedOption === option ? 'active_option' : ''}`"
          @click="selctOption(option)"
        >
          <div class="mr-[30px] mt-[6px]">
            <svg
              v-if="seletedOption === option"
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
          <div class="basis-[85%]">
            <div class="flex items-center justify-between mb-[30px]">
              <p class="text-[#021C3E] text-[21px] font-medium">
                {{
                  functions.formatMoney(option.amount_per_installment, "NGN")
                }} / {{ formattedFreq(option.frequency_duration, option.frequency_type, option.duration, option.duration_type) }}
              </p>
              <div
                class="bg-[#7A62EB1A] ml-[10px] flex justify-center items-center gap-2.5 px-2.5 py-[3px] rounded-[10px]"
              >
                <p class="text-[#7A62EB] text-[15px] font-medium">
                  <!-- for {{ option.duration }}
                  {{
                    option.duration_type === "yearly"
                      ? "year"
                      : option.duration_type === "monthly"
                        ? "month"
                        : option.duration_type === "weekly"
                          ? "week"
                          : option.duration_type === "daily"
                            ? "day"
                            : ""
                  }}{{ option.duration > 1 ? "s" : "" }} -->
                  {{ formattedDuration(option.frequency_duration, option.duration, option.duration_type) }}
                </p>
              </div>
            </div>
            <div class="w-[100%] flex justify-between">
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Interest %</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">
                  {{ option.interest_rate }}%
                </p>
              </div>
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Interest Value</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">
                  {{ functions.formatMoney(option.interest, "NGN") }}
                </p>
              </div>
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Total payment</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">
                  {{ functions.formatMoney(option.total_repayment, "NGN") }}
                </p>
              </div>
            </div>
          </div>
        </div>
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
</template>

<script setup>
import axios from "axios";
const emit = defineEmits(["continue"]);
const dataStore = useUserStore();

const repaymentData = ref(dataStore.repaymentOption || []);
const loanAmount = ref(dataStore.loanAmount || 0);
const seletedOption = ref({});
const loading = ref(false);

const selctOption = (data) => {
  console.log(data);
  seletedOption.value = data;
};

const save = () => {
  dataStore.updateSelectedRepaymentOption(seletedOption.value);
  emit("continue");
};

const formattedFreq = (frequency_duration, frequency_type, duration, duration_type, shorthand = true) => {
  // const { frequency_duration, frequency_type, duration, duration_type } = plan;
  if (
    shorthand &&
    frequency_duration === duration &&
    frequency_type === duration_type
  ) {
    return "once";
  }
  if (
    shorthand &&
    frequency_duration === 2 &&
    ["weekly", "monthly"].includes(frequency_type)
  ) {
    return `bi-${frequency_type}`;
  }
  return `every ${frequency_duration}
      ${
        frequency_duration > 1
          ? `${
              frequency_type === "daily"
                ? frequency_type.replace("il", "")
                : frequency_type.replace("ly", "s")
            }`
          : frequency_type.replace("ly", "")
      }`;
};

const formattedDuration = (frequency_duration, duration, duration_type) => {
  // const { frequency_duration, duration, duration_type } = plan;
  return `
       ${frequency_duration === duration ? "in" : "for"} ${duration}
       ${
         duration > 1
           ? `${
               duration_type === "daily"
                 ? `${duration_type.replace("il", "")}`
                 : duration_type.replace("ly", "")
             }s`
           : duration_type.replace("ly", "")
       }`;
};
</script>

<style scoped>
.repayment_ctn {
  width: 50vw;
  min-width: 500px;
  padding: 50px 30px 50px 50px;
  margin-top: 4vh;
  margin-left: 5vw;
}
.welcome_text {
  color: #021c3e;
  font-size: 24px;
  font-weight: 700;
}

.instruction_text {
  color: #021c3e73;
}

.content_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
}

.content_value {
  color: #6a707e;
  font-size: 16px;
  font-weight: 500;
}

.loan_options {
  margin-top: 30px;
}

.option {
  background-color: #f9fafc;
  border: 1px solid #d7e1ec;
  padding: 25px;
  border-radius: 20px;
  margin-bottom: 20px;
  cursor: pointer;
}

.active_option {
  background-color: #7a62eb1a;
  border: 1px solid #7a62eb;
}

.bold_text {
  color: #10253e;
  font-size: 19px;
  font-weight: 700;
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
.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.btn-div {
  width: 60%;
  margin: auto;
  margin-top: 3rem;
}
</style>
