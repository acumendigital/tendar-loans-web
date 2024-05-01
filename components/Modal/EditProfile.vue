<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Edit Profile</h1>
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
                type="text"
                name="dob"
                placeholder=""
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
                <option value="contract-worker">Contract Worker</option>
                <option value="self-employed">Self Employed</option>
                <option value="employed">Employed</option>
                <option value="business-owner">Business Owner</option>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import compCities from "countrycitystatejson";
const toast = useToast();
const dataStore = useUserStore();
const emit = defineEmits(["continue"]);
const submitClicked = ref(false);
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
});
const countries = ref(
  compCities
    .getCountries()
    .filter((c) => c.shortName === "NG" || c.shortName === "US")
);

const formattedDob = ref("");

const otp = ref("");
const loading = ref(false);
const resendLoading = ref(false);
const firstName = ref(dataStore.userProfile?.first_name || "");
const lastName = ref(dataStore.userProfile?.last_name || "");
const dob = ref(dataStore.userProfile?.date_of_birth || "");
const gender = ref(dataStore.userProfile?.gender || "");
const employmentStatus = ref(dataStore.userProfile?.employment_status || "");
const jobTitle = ref(dataStore.userProfile?.job_title || "");
const address = ref(dataStore.userProfile?.address.address || "");
const country = ref(
  countries.value.find(
    (c) =>
      c.name ===
      functions.capitalizeFirstLetter(dataStore.userProfile?.address.country)
  ) || {}
);
const state = ref("");
const states = ref([]);
const city = ref("");
const cities = ref([]);

const setStates = () => {
  states.value = compCities.getStatesByShort(country.value.shortName);
};
const setCities = () => {
  cities.value = compCities.getCities(country.value.shortName, state.value);
};

const formateDate = (e) => {
  const date = e;
  const newDate = new Date(date);
  const yyyy = newDate.getFullYear();
  let mm = newDate.getMonth() + 1; // Months start at 0!
  let dd = newDate.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "/" + mm + "/" + yyyy;
  formattedDob.value = formattedDate;
  return formattedDob.value;
};

const save = () => {
  submitClicked.value = true;
  if (
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
  loading.value = true;
  formattedDob.value
  const data = {
    first_name: firstName.value,
    last_name: lastName.value,
    date_of_birth: dob.value,
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
  // const path = "customer/create";
  axios
    .put("customer/update", data)
    .then((onfulfilled) => {
      toast.add({ title: "Profile Updated", color: "green" });
      const user_profile = onfulfilled.data.data.customer;
      emit("continue");
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
const loadStates = () => {
  if (country.value.name) {
    setStates();
  }
  state.value = dataStore.userProfile?.address.state;
  if (state.value) {
    setCities();
  }
  city.value = dataStore.userProfile?.address.city;
};

loadStates();
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
