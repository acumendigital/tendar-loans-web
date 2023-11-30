<template>
  <div class="form-content">
    <div class="page-form-ctn">
      <p class="welcome_text">Create password</p>
      <p class="instruction_text">
        Create a new password for your Tendar account.
      </p>
      <div class="form">
        <div class="form-group">
          <label for="otp">Enter OTP</label>
          <input
            id="otp"
            v-model="email_otp"
            type="text"
            name="otp"
            placeholder="Enter the OTP sent to your email"
          />
        </div>
        <p v-if="sendClicked && !email_otp" class="error-text">
          This field is reqired
        </p>
        <div class="form-group">
          <label for="password">New Password</label>
          <SecretKeyInput
            id="password"
            :copy-needed="false"
            :current-key="password"
            :disabled="false"
            placeholder="Enter your password"
            @update-value="updateValue($event)"
          />
        </div>
        <p v-if="sendClicked && !password" class="error-text">
          This field is reqired
        </p>
        <div class="form-group">
          <label for="password">Confirm Password</label>
          <SecretKeyInput
            id="confirm-password"
            :copy-needed="false"
            :current-key="confirm_password"
            placeholder="Enter your password"
            @keyup.enter="routeToLogin()"
            @update-value="updateSecValue($event)"
          />
        </div>
        <p v-if="sendClicked && !confirm_password" class="error-text">
          This field is reqired
        </p>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="routeToLogin()">
            Create Password
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="$router.go(-1)">Go back</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authlayout",
});

const email_otp = ref("");
const password = ref("");
const confirm_password = ref("");
const emailError = ref(false);
const loading = ref(false);
const sendClicked = ref(false);

// export default {
//   layout: 'authLayout',
//   data() {
//     return {
//       email_otp: '',
//       emailError: false,
//       loading: false,
//       password: '',
//       confirm_password: '',
//       sendClicked: false,
//     }
//   },
//   methods: {
//     routeToLogin() {
//       this.sendClicked = true
//       if (
//         this.email_otp.trim() !== '' &&
//         this.password.trim() !== '' &&
//         this.confirm_password.trim() !== ''
//       ) {
//         if (this.password.trim() === this.confirm_password.trim()) {
//           this.loading = true
//           const data = {
//             email: this.$store.state.OTPEmail,
//             password: this.password,
//             email_token: this.email_otp,
//             address: 'Lagos, Nigeria',
//             longitude: null,
//             latitude: null,
//           }
//           this.$axios({
//             url: '/admin/auth/reset/password',
//             method: 'POST',
//             data,
//           })
//             .then((onfulfilled) => {
//               this.$toast.success(onfulfilled.data.message, {
//                 duration: 4000,
//                 action: {
//                   icon: 'check',
//                   onClick: (e, toastObject) => {
//                     toastObject.goAway(0)
//                   },
//                 },
//               })
//               this.$router.push('/auth/login')
//             })
//             .catch((_err) => {
//               const errorMsg = _err?.response?.data?.message || _err?.message
//               if (errorMsg) {
//                 this.$toast.error(errorMsg)
//               } else {
//                 this.$toast.error(
//                   'Oops, something went wrong, please try again later'
//                 )
//               }
//             })
//             .finally(() => {
//               this.loading = false
//             })
//         } else {
//           this.loading = false
//           this.$toast.error('Password unmatch error')
//         }
//       }
//     },
//     updateValue(e) {
//       this.password = e
//     },
//     updateSecValue(e) {
//       this.confirm_password = e
//     },
//   },
// }
</script>

<style scoped>
.form-content {
  background: #fff;
  width: 30vw;
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

.action-btn {
  margin-top: 4vh;
  width: 100%;
}

.action-btn:hover {
  border: 1px solid var(--primary-purple);
  background: var(--primary-purple);
  color: #fff;
}

.error-text {
  margin-top: -1.7vh;
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
