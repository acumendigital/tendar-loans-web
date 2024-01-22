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
        <p class="content_value bold_text">₦50,000</p>
      </div>
      <div class="loan_options">
        <p class="content_title">Select your preferred option below</p>
        <div
          v-for="(option, index) in 3"
          :key="index"
          class="option flex items-start"
          :class="`${seletedOption === index ? 'active_option' : ''}`"
          @click="selctOption(index)"
        >
          <div class="mr-[30px] mt-[6px]">
            <svg
              v-if="seletedOption === index"
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
            <div class="flex items-center mb-[30px]">
              <p class="text-[#021C3E] text-[21px] font-medium">₦300,000</p>
              <div
                class="bg-[#7A62EB1A] ml-[10px] flex justify-center items-center gap-2.5 px-2.5 py-[3px] rounded-[10px]"
              >
                <p class="text-[#7A62EB] text-[15px] font-medium">
                  for 6 months
                </p>
              </div>
            </div>
            <div class="w-[100%] flex justify-between">
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Interest %</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">7%</p>
              </div>
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Interest Value</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">25,000</p>
              </div>
              <div class="basis-[33%]">
                <p class="text-[#6A707E] font-[500]">Total payment</p>
                <p class="text-[#6A707E] font-[700] mt-[10px]">₦525,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-div">
        <button v-if="!loading" class="action-btn" @click="$emit('continue')">
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

const amount = ref("");
const duration = ref("");
const frequency = ref("");
const seletedOption = ref(null);
const showOtpModal = ref(false);
const loading = ref(false);

const tokenStore = useUserStore();

const formateDate = (e) => {
  // console.log(e.target.value);
  const date = e.target.value;
  // console.log(date);
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  let mm = newDate.getMonth() + 1; // Months start at 0!
  let dd = newDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  formattedDob.value = formattedDate;
  console.log(formattedDob.value);
};

const selctOption = (data) => {
  console.log(data);
  seletedOption.value = data;
};

const save = () => {
  loading.value = true;
  console.log(loading.value);
  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    date_of_birth: formattedDob.value,
    gender: gender.value,
    address: {
      address: address.value.toLowerCase(),
      city: city.value.toLowerCase(),
      state: state.value.toLowerCase(),
      country: country.value.toLowerCase(),
    },
    employment_status: employmentStatus.value,
    job_title: jobTitle.value,
  };
  console.log(data);
  // const path = "customer/create";
  axios
    .post("customer/create", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      navigateTo("/user/verify-identity");
      // }
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
.repayment_ctn {
  width: 45vw;
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
