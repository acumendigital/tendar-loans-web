<template>
  <div>
    <p class="welcome_text">Let’s get to know you</p>
    <p class="instruction_text">
      Streamline your loan journey with a quick profile update!
    </p>
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
            disabled
          />
        </div>
        <div class="form-group">
          <label class="form_label" for="lastName">Last Name</label>
          <input
            id="lastName"
            v-model="lastName"
            type="text"
            name="lastName"
            placeholder="Enter your Last Name"
            disabled
          />
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
            disabled
          />
        </div>
        <div class="modal-input-field">
          <label class="form_label" for="gender">Gender</label>
          <select id="gender" v-model="gender" name="gender" disabled>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <!-- </div> -->
          <!-- <div
              :class="submitClicked && !gender ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
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
          <!-- </div> -->
          <!-- <div
              :class="submitClicked && !employmentStatus ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
        </div>
        <div class="form-group">
          <label class="form_label" for="jobTitle">Job title (Optional)</label>
          <input
            id="jobTitle"
            v-model="jobTitle"
            type="text"
            name="jobTitle"
            placeholder="Enter your Job Title"
          />
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
        </div>
        <div class="form-group">
          <label class="form_label" for="country">Country</label>
          <input
            id="country"
            v-model="country"
            type="text"
            name="country"
            placeholder="Enter your Country"
          />
        </div>
      </div>
      <div class="form_group_flex">
        <div class="form-group">
          <label class="form_label" for="state">State</label>
          <input
            id="state"
            v-model="state"
            type="text"
            name="state"
            placeholder="Enter your State"
          />
        </div>
        <div class="form-group">
          <label class="form_label" for="city">City</label>
          <input
            id="city"
            v-model="city"
            type="text"
            name="city"
            placeholder="Enter your City"
          />
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
  </div>
</template>

<script setup>
import axios from "axios";

const firstName = ref(dataStore.userProfile?.first_name || '');
const lastName = ref(dataStore.userProfile?.last_name || '');
const dob = ref(dataStore.userProfile?.date_of_birth || '');
const formattedDob = ref("");
const gender = ref(dataStore.userProfile?.gender || '');
const employmentStatus = ref(dataStore.userProfile?.employment_status || '');
const jobTitle = ref(dataStore.userProfile?.job_title || '');
const address = ref(dataStore.userProfile?.address.address || '');
const city = ref(dataStore.userProfile?.address.city || '');
const state = ref(dataStore.userProfile?.address.state || '');
const country = ref(dataStore.userProfile?.address.country || '');
const showOtpModal = ref(false);
const loading = ref(false);

const tokenStore = useUserStore();
const emit = defineEmits(['continue'])

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
    .put("customer/update", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      toast.add({ title: "Profile Updated", color: "green" });
      console.log(onfulfilled);
      // navigateTo("/user/verify-identity");
      // }
      emit('continue');
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
