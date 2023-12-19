<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Enter Profile</h1>
        <span
          class="material-icons-outlined close"
           @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">
        Streamline your loan journey with a quick profile update
      </p>
      <div class="modal_content">
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
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const toast = useToast();
const dataStore = useUserStore();
const emit = defineEmits(['continue'])
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
});


const formattedDob = ref("");

const reFormatDate = (e) => {
  console.log(e);
  const date = e;
  console.log(date);
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  let mm = newDate.getMonth() + 1; // Months start at 0!
  let dd = newDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = yyyy + "-" + mm + "-" + dd;
  formattedDob.value = formattedDate;
  console.log(formattedDob.value);
  return formattedDob.value;
};

const otp = ref('');
const loading = ref(false);
const resendLoading = ref(false);
const firstName = ref(dataStore.userProfile?.first_name || '');
const lastName = ref(dataStore.userProfile?.last_name || '');
const dob = ref(reFormatDate(dataStore.userProfile?.date_of_birth) || '');
console.log(dob);
const gender = ref(dataStore.userProfile?.gender || '');
const employmentStatus = ref(dataStore.userProfile?.employment_status || '');
const jobTitle = ref(dataStore.userProfile?.job_title || '');
const address = ref(dataStore.userProfile?.address.address || '');
const city = ref(dataStore.userProfile?.address.city || '');
const state = ref(dataStore.userProfile?.address.state || '');
const country = ref(dataStore.userProfile?.address.country || '');

const formateDate = (e) => {
  // console.log(e);
  // console.log(e.target.value);
  const date = e;
  // console.log(date);
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  let mm = newDate.getMonth() + 1; // Months start at 0!
  let dd = newDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  formattedDob.value = formattedDate;
  return formattedDob.value
};

console.log('date - ', dataStore.userProfile?.date_of_birth);
console.log('new date - ', new Date(dataStore.userProfile?.date_of_birth));

const save = () => {
  loading.value = true;
  console.log(loading.value);
  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    date_of_birth: formateDate(formattedDob.value),
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
.modal-backdrop {
  z-index: 50;
  position: fixed;
  overflow: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(24, 18, 46, 0.8);
}

.modal {
  /* margin-top: 5%; */
  position: relative;
  background-color: white;
  max-width: 550px;
  width: 33%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem;
}

.top_section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-top: 2rem;
}

.modal_subtitle {
  color: #808d9f;
  text-align: center;
  font-size: 16px;
  margin-bottom: 2rem;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #c5c5c5;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  margin-top: 10px;
}

.form {
  margin-top: 3vh;
  /* padding-right: 30px; */
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

@media only screen and (max-width: 1400px) {
  .modal {
    width: 50%;
  }
}

@media only screen and (max-width: 900px) {
  .modal {
    width: 70%;
  }
}

@media only screen and (max-width: 500px) {
  .modal {
    width: 90%;
    padding: 2rem;
    height: 80vh;
  }
}
</style>
