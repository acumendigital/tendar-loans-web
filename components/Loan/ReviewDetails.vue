<template>
  <div class="form-content">
    <div class="ctn">
      <p class="welcome_text">Review loan details</p>
      <p class="instruction_text">
        A comprehensive overview of your loan request.
      </p>
      <div class="form">
        <div class="contents">
          <div class="content">
            <p class="content_title">Loan Amount</p>
            <p class="content_value bold_text">₦50,000</p>
          </div>
          <div class="content">
            <p class="content_title">Amount to be repaid</p>
            <p class="content_value bold_text">₦65,000</p>
          </div>
          <div class="content">
            <p class="content_title">Frequency</p>
            <p class="content_value">Monthly</p>
          </div>
          <div class="content">
            <p class="content_title">Interest rate</p>
            <p class="content_value">5%</p>
          </div>
          <div class="content">
            <p class="content_title">Duration</p>
            <p class="content_value">6 months</p>
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

.form {
  margin-top: 3vh;
  padding-right: 30px;
}

.contents {
  display: flex;
  flex-wrap: wrap;
}

.content {
  flex-basis: 45%;
  margin-bottom: 25px;
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

.bold_text {
  color: #10253e;
  font-size: 19px;
  font-weight: 700;
}
</style>
