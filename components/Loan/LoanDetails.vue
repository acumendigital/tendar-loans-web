<template>
  <div class="ctn">
    <p class="welcome_text">Loan details</p>
    <p class="instruction_text">
      Discover tailored loan solutions for your every need
    </p>
    <div class="info_box">
      <p>
        Based on our assessment, this is the highest amount we can offer you for
        now
      </p>
      <div class="amount_box" @click="amount = '50000'"><p>N50,000</p></div>
    </div>
    <div class="form">
      <div class="form-group">
        <label for="">How much do you want to borrow?</label>
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
        <label class="form_label" for="reasonForLoan">Reason for loan</label>
        <select id="reasonForLoan" v-model="reasonForLoan" name="reasonForLoan">
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
        <!-- <div
              :class="submitClicked && !reasonForLoan ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
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
// import { Money } from "v-money";
import axios from "axios";

const money = ref({
  prefix: "₦ ",
  precision: 0,
  masked: false,
});
const amount = ref("");
const reasonForLoan = ref("");
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
.ctn {
  padding: 0 4rem;
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
  border-radius: 5px;
  background: #7a62eb;
  padding: 10px 20px;
  cursor: pointer;
}

.amount_box > p {
  color: #fff;
  font-size: 12px;
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
