<template>
  <div class="form-content">
    <div class="page-form-ctn">
      <p class="welcome_text">Forgot password?</p>
      <p class="instruction_text">
        Please enter your email, a reset OTP will be sent to you soon
      </p>
      <div class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email_name"
            type="text"
            name="email"
            placeholder="Enter your username or email"
          />
        </div>
        <p v-if="sendClicked && !email_name" class="error-text">
          This field is reqired
        </p>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="navigateTo('/auth/password/reset-password')">
            Submit
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="$router.go(-1)">Cancel</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authlayout",
});

const email_name = ref("");
const emailError = ref(false);
const loading = ref(false);
const sendClicked = ref(false);

// export default {
//   layout: 'authlayout',
//   data() {
//     return {
//       email_name: "",
//       emailError: false,
//       loading: false,
//       sendClicked: false,
//     };
//   },
//   methods: {
//     sendOtp() {
//       this.sendClicked = true;
//       if (this.email_name.trim() !== "") {
//         this.loading = true;
//         const data = {
//           email: this.email_name,
//         };
//         this.$axios({
//           url: "/admin/auth/sendResetOTP/email/password",
//           method: "POST",
//           data,
//         })
//           .then((onfulfilled) => {
//             this.$store.commit("saveEmailForOTP", this.email_name);
//             this.$toast.success(onfulfilled.data.message, {
//               duration: 4000,
//               action: {
//                 icon: "check",
//                 onClick: (e, toastObject) => {
//                   toastObject.goAway(0);
//                 },
//               },
//             });
//             // this.$toast.success(onfulfilled.data.message, {duration: 4000})
//             this.$router.push("/auth/password/reset-password");
//           })
//           .catch((_err) => {
//             const errorMsg = _err?.response?.data?.message || _err?.message;
//             if (errorMsg) {
//               this.$toast.error(errorMsg, {
//                 duration: 4000,
//               });
//             } else {
//               this.$toast.error(
//                 "Oops, something went wrong, please try again later",
//                 {
//                   duration: 4000,
//                 }
//               );
//             }
//           })
//           .finally(() => {
//             this.loading = false;
//           });
//       }
//     },
//   },
// };
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
  margin-top: 4vh;
  padding-right: 30px;
}

.action-btn {
  margin-top: 6vh;
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
