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
        <!-- <div class="rhs">
          <p class="auth_text">
            Already have an account? <br /><span
              class="signup_btn"
              @click="navigateTo('/auth/login')"
              >Sign in</span
            >
          </p>
        </div> -->
      </div>
      <p class="welcome_text">Let’s get to know you</p>
      <p class="instruction_text">
        Tell us a bit about yourself, we just need the basics
      </p>
      <!-- <div class="signin-form-ctn"> -->
      <div class="form">
        <div class="form_group_flex">
          <div class="form-group">
            <label class="form_label" for="firstName">First Name</label>
            <input
              id="firstName"
              v-model="firstName"
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
            />
            <div
              :class="submitClicked && !firstName ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="form-group">
            <label class="form_label" for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="lastName"
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
            />
            <div
              :class="submitClicked && !lastName ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
        </div>
        <div class="form_group_flex">
          <div class="form-group">
            <label class="form_label" for="dob">Date of Birth</label>
            <input
              id="dob"
              v-model="dob"
              type="date"
              name="dob"
              placeholder="Enter your First Name"
              @change="formateDate"
            />
            <div
              :class="submitClicked && !dob ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="modal-input-field">
            <label class="form_label" for="gender">Gender</label>
            <select id="gender" v-model="gender" name="gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div
              :class="submitClicked && !gender ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
        </div>
        <div class="form_group_flex">
          <div class="modal-input-field">
            <label class="form_label" for="employmentStatus"
              >Employment status</label
            >
            <select
              id="employment-status"
              v-model="employmentStatus"
              name="employment-status"
            >
              <option value="">Select</option>
              <option value="contract worker">Contract Worker</option>
              <option value="self employed">Self Employed</option>
              <option value="employed">Employed</option>
              <option value="business owner">Business Owner</option>
              <option value="student">Student</option>
              <option value="unemployed">Unemployed</option>
            </select>
            <div
              :class="submitClicked && !employmentStatus ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="form-group">
            <label class="form_label" for="jobTitle"
              >Job title (Optional)</label
            >
            <input
              id="jobTitle"
              v-model="jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Enter your Job Title"
            />
            <!-- <div
              :class="submitClicked && !jobTitle ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
          </div>
        </div>
        <div class="form_group_flex">
          <div class="form-group">
            <label class="form_label" for="address">Address</label>
            <input
              id="address"
              v-model="address"
              type="text"
              name="address"
              placeholder="Enter your Address"
            />
            <div
              :class="submitClicked && !address ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="form-group">
            <label class="form_label" for="country">Country</label>
            <select
              id="country"
              v-model="country"
              name=""
              @change="setStates()"
            >
              <option value="" disabled selected>Please select</option>
              <option v-for="(c, index) in countries" :key="index" :value="c">
                {{ c.name }}
              </option>
            </select>
            <div
              :class="submitClicked && !country.name ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
        </div>
        <div class="form_group_flex">
          <div class="form-group">
            <label class="form_label" for="state">State</label>
            <select id="state" v-model="state" name="" @change="setCities()">
              <option value="" disabled selected>Please select</option>
              <option v-for="s in states" :key="s" :value="s">
                {{ s }}
              </option>
            </select>
            <div
              :class="submitClicked && !state ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
          <div class="form-group">
            <label class="form_label" for="city">City</label>
            <select id="city" v-model="city" name="">
              <option value="" disabled selected>Please select</option>
              <option v-for="(c, index) in cities" :key="index" :value="c">
                {{ c }}
              </option>
            </select>
            <div
              :class="submitClicked && !city ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div>
          </div>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <!-- <p class="link_text">Cancel</p> -->
      </div>
      <!-- </div> -->
    </div>
    <ModalEnterOtp v-if="showOtpModal" @close-modal="showOtpModal = false" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
});

import axios from "axios";
const route = useRoute();
import compCities from "countrycitystatejson";
const countries = ref(
  compCities
    .getCountries()
    .filter((c) => c.shortName === "NG" || c.shortName === "US")
);

const toast = useToast();
const firstName = ref("");
const lastName = ref("");
const dob = ref("");
const formattedDob = ref("");
const gender = ref("");
const employmentStatus = ref("");
const jobTitle = ref("");
const address = ref("");
const country = ref({});
const state = ref("");
const states = ref([]);
const city = ref("");
const cities = ref([]);
const submitClicked = ref(false);
const showOtpModal = ref(false);
const loading = ref(false);

const setStates = () => {
  states.value = compCities.getStatesByShort(country.value.shortName);
  // console.log(states.value);
};
const setCities = () => {
  cities.value = compCities.getCities(country.value.shortName, state.value);
  // console.log(compCities.getCities(country.value.shortName, state.value))
};

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
  submitClicked.value = true;
  if (
    firstName.value &&
    lastName.value &&
    dob.value &&
    gender.value &&
    employmentStatus.value &&
    address.value &&
    city.value &&
    state.value &&
    country.value.name
  ) {
    saveProfile();
  }
};

const saveProfile = () => {
  const fallBackUrl = route.query?.fallBackUrl;
  loading.value = true;
  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    date_of_birth: formattedDob.value,
    gender: gender.value,
    address: {
      address: address.value,
      city: city.value,
      state: state.value,
      country: country.value.name.toLowerCase(),
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
      if (fallBackUrl) {
        toast.add({ title: "Pin Created", color: "green" });
        navigateTo(fallBackUrl);
      } else {
        toast.add({ title: "Profile Created", color: "green" });
        navigateTo("/user/verify-identity");
      }
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
  padding: 30px 30px 30px 50px;
  border-radius: 10px;
  margin-top: 4vh;
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
  margin-bottom: 30px;
}
.welcome_text {
  color: #021c3e;
  font-size: 26px;
  font-weight: 700;
}

.company_logo {
  width: 50%;
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

.terms_privacy_text {
  color: rgba(16, 37, 62, 0.5);
  font-size: 13px;
  font-weight: 400;
  margin-top: -20px;
  margin-bottom: 25px;
}

.link_text {
  color: var(--primary-purple);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
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
