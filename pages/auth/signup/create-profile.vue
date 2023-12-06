<template>
  <div class="form-content">
    <div class="page-form-ctn">
      <div class="auth_top">
        <div class="lhs">
          <img
            class="company_logo"
            src="~assets/images/aumen_logo.png"
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
              v-model="profile.firstName"
              type="text"
              name="firstName"
              placeholder="Enter your First Name"
            />
          </div>
          <div class="form-group">
            <label class="form_label" for="lastName">Last Name</label>
            <input
              id="lastName"
              v-model="profile.lastName"
              type="text"
              name="lastName"
              placeholder="Enter your Last Name"
            />
          </div>
        </div>
        <div class="form_group_flex">
          <div class="form-group">
            <label class="form_label" for="dob">Date of Birth</label>
            <input
              id="dob"
              v-model="profile.dob"
              type="date"
              name="firstName"
              placeholder="Enter your First Name"
            />
          </div>
          <div class="form-group">
            <label class="form_label" for="gender">Gender</label>
            <input
              id="gender"
              v-model="profile.gender"
              type="text"
              name="gender"
              placeholder="Enter your Last Name"
            />
          </div>
        </div>
        <div class="form_group_flex">
          <div class="modal-input-field">
            <label class="form_label" for="employmentStatus"
              >Employment status</label
            >
            <select
              id="employmentStatus"
              ref="employmentStatus"
              v-model="profile.employmentStatus"
              name="employmentStatus"
            >
              <option value="">Select</option>
              <option value="Employed">Employed</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Student">Student</option>
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
            <label class="form_label" for="jobTitle"
              >Job title (Optional)</label
            >
            <input
              id="jobTitle"
              v-model="profile.jobTitle"
              type="text"
              name="jobTitle"
              placeholder="Enter your Job Title"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="form_label" for="address">Home Address</label>
          <input
            id="address"
            v-model="profile.address"
            type="text"
            name="address"
            placeholder="Enter your Address"
          />
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text">Cancel</p>
      </div>
      <!-- </div> -->
    </div>
    <ModalEnterOtp v-if="showOtpModal" @close-modal="showOtpModal = false" />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authlayout",
});

import axios from "axios";
const config = useRuntimeConfig();
const baseUrl = config.public.BASE_URL;
const encryptionKey = config.public.ENCRYPTION_KEY;

const profile = ref({
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  employmentStatus: "",
  jobTitle: "",
  address: {
    address: "",
    city: "",
    state: "",
    country: "",
  },
});
const showOtpModal = ref(false);
const loading = ref(false);
// const encryptData = functions.encryptData;

const tokenStore = useStore();

const updateValue = (e) => {
  password.value = e;
};

const save = () => {
  loading.value = true;
  const data = {
    first_name: profile.firstName.value,
    last_name: profile.lastName.value,
    date_of_birth: profile.dob.value,
    gender: profile.gender.value,
    address: {
      address: "",
      city: "",
      state: "",
      country: "",
    },
    employment_status: profile.employmentStatus.value,
    job_title: profile.jobTitle.value,
  };
  const path = "customer/create";
  axios
    .post(`${baseUrl}${path}`, data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      const token = onfulfilled.data.data.token;
      const api_token = onfulfilled.data.data.api_token;
      tokenStore.token = token;
      tokenStore.apiToken = api_token;
      showOtpModal.value = true;
      // navigateTo('/auth/signup/add-bank')
      // if (
      //   onfulfilled.data.message ===
      //     'A one time token has been sent to your email address' ||
      //   onfulfilled.data.message ===
      //     'A one time token has been sent to your phone number'
      // ) {
      //   this.$store.commit('saveEmailForOTP', this.email)
      //   this.$toast.success(onfulfilled.data.message, {
      //     duration: 4000,
      //     action: {
      //       icon: 'check',
      //       onClick: (e, toastObject) => {
      //         toastObject.goAway(0)
      //       },
      //     },
      //   })
      //   let otpAuth = ""
      //   if (data.email_authentication) {
      //     otpAuth = "email"
      //   } else if (data.sms_authentication) {
      //     otpAuth = "sms"
      //   }
      //   // console.log("david", otpAuth)
      //   this.$router.push(`/auth/login/security?authType=${otpAuth}`)
      // } else if (
      //   onfulfilled.data.message === 'user signed in successfully'
      // ) {
      //   this.$store.commit('setLoggedInState', true)
      //   this.$store.commit('saveUserDetails', data)
      //   this.$store.commit('saveToken', data.token)
      //   this.$store.commit('saveXApiKey', data.api_token)
      //   this.$store.commit('saveAdminDetails', data.admin)
      //   const url = this.$route.query.fallBackUrl || '/'
      //   this.$router.push(`${url}`)
      // } else {
      //   this.$store.commit('setLoggedInState', true)
      //   this.$store.commit('saveUserDetails', data)
      //   this.$store.commit('saveToken', data.token)
      //   this.$store.commit('saveXApiKey', data.api_token)
      //   this.$store.commit('saveAdminDetails', data.admin)
      //   const url = this.$route.query.fallBackUrl || '/'
      //   this.$router.push(`${url}`)
      // }
    })
    .catch((_err) => {
      const errorMsg = _err?.response?.data?.message || _err?.message;
      if (errorMsg) {
        this.$toast.error(errorMsg);
      } else {
        this.$toast.error("Oops, something went wrong, please try again later");
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
// import functions from '~/utils/functions'
// export default {
//   layout: 'authlayout',
//   data() {
//     return {
//       encryptData: functions.encryptData,
//       email: '',
//       password: '',
//       showPassword: false,
//       loading: false,
//       encryption_key: this.$config.ENCRYPTION_KEY
//     }
//   },
//   head() {
//     return {
//       title: 'Login | Tendar Admin',
//     }
//   },
// watch: {
//   password(val) {
//     if (this.email.length && val.length) {
//       this.inputsFilled = false
//     } else {
//       this.inputsFilled = true
//     }
//   },
// },
// methods: {
//   updateValue(e) {
//     this.password = e
//   },
//   // signIn() {
//   //   this.$router.push('/auth/login/security')
//   // }
//   signIn() {
//     this.loading = true
//     // const encrptedPassword = this.encryptData(this.password, this.encryption_key)
//     // console.log(this.email.trim());
//     // console.log(encrptedPassword)
//     const data = {
//       email: this.email.trim(),
//       password: this.encryptData(this.password, this.encryption_key),
//       address: '',
//       longitude: null,
//       latitude: null,
//     }
//     this.$axios({
//       url: '/admin/auth/login',
//       method: 'POST',
//       data,
//     })
//       .then((onfulfilled) => {
//         const data = onfulfilled?.data?.data
//         // console.log(onfulfilled)
//         if (
//           onfulfilled.data.message ===
//             'A one time token has been sent to your email address' ||
//           onfulfilled.data.message ===
//             'A one time token has been sent to your phone number'
//         ) {
//           this.$store.commit('saveEmailForOTP', this.email)
//           this.$toast.success(onfulfilled.data.message, {
//             duration: 4000,
//             action: {
//               icon: 'check',
//               onClick: (e, toastObject) => {
//                 toastObject.goAway(0)
//               },
//             },
//           })
//           let otpAuth = ""
//           if (data.email_authentication) {
//             otpAuth = "email"
//           } else if (data.sms_authentication) {
//             otpAuth = "sms"
//           }
//           // console.log("david", otpAuth)
//           this.$router.push(`/auth/login/security?authType=${otpAuth}`)
//         } else if (
//           onfulfilled.data.message === 'user signed in successfully'
//         ) {
//           this.$store.commit('setLoggedInState', true)
//           this.$store.commit('saveUserDetails', data)
//           this.$store.commit('saveToken', data.token)
//           this.$store.commit('saveXApiKey', data.api_token)
//           this.$store.commit('saveAdminDetails', data.admin)
//           const url = this.$route.query.fallBackUrl || '/'
//           this.$router.push(`${url}`)
//         } else {
//           this.$store.commit('setLoggedInState', true)
//           this.$store.commit('saveUserDetails', data)
//           this.$store.commit('saveToken', data.token)
//           this.$store.commit('saveXApiKey', data.api_token)
//           this.$store.commit('saveAdminDetails', data.admin)
//           const url = this.$route.query.fallBackUrl || '/'
//           this.$router.push(`${url}`)
//         }
//       })
//       .catch((_err) => {
//         const errorMsg = _err?.response?.data?.message || _err?.message
//         if (errorMsg) {
//           this.$toast.error(errorMsg)
//         } else {
//           this.$toast.error(
//             'Oops, something went wrong, please try again later'
//           )
//         }
//       })
//       .finally(() => {
//         this.loading = false
//       })
//   },
// },
// }
</script>

<style scoped>
.form-content {
  background: #fff;
  width: 38vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 40px 30px 50px 50px;
  border-radius: 10px;
  margin-top: 5vh;
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
