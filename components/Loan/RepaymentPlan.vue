
import type { duration } from 'moment';
<template>
  <div>
    <p class="welcome_text">Repayment plan</p>
    <p class="instruction_text">
      Discover tailored loan solutions for your every need
    </p>
    <div class="form">
      <div class="form_group_flex">
        <div class="form-group">
          <label class="form_label" for="firstName">Amount</label>
          <input
            id="amount"
            v-model="amount"
            type="number"
            name="amount"
            placeholder="Enter your Amount"
          />
        </div>
        <div class="modal-input-field">
          <label class="form_label" for="duration">Duration</label>
          <select id="duration" v-model="duration" name="duration">
            <option value="">Select</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <!-- </div> -->
          <!-- <div
              :class="submitClicked && !duration ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
        </div>
      </div>
      <div class="form_group_flex">
        <div class="modal-input-field">
          <label class="form_label" for="frequency">Frequency</label>
          <select id="frequency" v-model="frequency" name="frequency">
            <option value="">Select</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <!-- </div> -->
          <!-- <div
              :class="submitClicked && !frequency ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
        </div>
        <div class="form-group">
          <label class="form_label" for="interestRate">Interest Rate</label>
          <input
            id="interestRate"
            v-model="interestRate"
            type="number"
            name="interestRate"
            placeholder="Enter your Interest Rate"
          />
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
      <p class="link_text" @click="$emit('go-back');">Back</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

const amount = ref("");
const duration = ref("");
const frequency = ref("");
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
</style>
