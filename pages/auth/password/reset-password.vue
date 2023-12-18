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
            v-model="otp"
            type="password"
            name="otp"
            placeholder="Enter the OTP sent to your email"
          />
        </div>
        <p v-if="sendClicked && !otp" class="error-text">
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
            @update-value="updatePasswordValue($event)"
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
            @keyup.enter="resetPassword()"
            @update-value="updateConfirmPasswordValue($event)"
          />
        </div>
        <p v-if="sendClicked && !confirm_password" class="error-text">
          This field is reqired
        </p>
        <p class="bottom_text">
          Didn’t get a code or expired code?
          <span v-if="!resendLoading" class="resend_btn" @click="resendOtp()">Resend code</span>
          <span v-else class="resend_btn_loader"><BtnLoader color="#7a62eb" size="20" /></span>
        </p>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="resetPassword()">
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
  layout: "auth-layout",
});

import axios from "axios";
const toast = useToast();
const route = useRoute();
const config = useRuntimeConfig();
const encryptionKey = config.public.ENCRYPTION_KEY;
const email = ref("");
const otp = ref("");
const password = ref("");
const confirm_password = ref("");
const emailError = ref(false);
const loading = ref(false);
const resendLoading = ref(false);
const sendClicked = ref(false);

const updatePasswordValue = (e) => {
  password.value = e;
};

const updateConfirmPasswordValue = (e) => {
  confirm_password.value = e;
};


const resendOtp = () => {
  email.value = route.query.email;
  console.log(email.value);
  resendLoading.value = true;
  const data = {
    email: email.value,
  };
  console.log(data);
  // const path = "user/send-verification-email";
  axios
    .post("auth/password/reset/send-email", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      toast.add({ title: "Code resent", color: "green" });
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
      resendLoading.value = false;
    });
};

const resetPassword = () => {
  if (password.value === confirm_password.value) {
    email.value = route.query.email;
    console.log(email.value);
    loading.value = true;
    const encrptedPassword = functions.encryptData(
      password.value,
      encryptionKey
    );
    console.log(encrptedPassword);
    // password.value =
    //   "e03a6564a8d8c15dafd6389680a3933a5ed8720fb6ecdf5bc447601d8b67ecb4f0200b35000fc4";
    const data = {
      email: email.value,
      token: otp.value.toString(),
      password: encrptedPassword,
    };
    console.log(data);
    axios
      .post("auth/password/reset", data)
      .then((onfulfilled) => {
        // const data = onfulfilled?.data?.data
        console.log(onfulfilled);
        toast.add({ title: "Reset password successful", color: "green" });
        navigateTo("/auth/login");
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
  } else {
  }
};
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
  margin-top: 140px;
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

.bottom_text {
  display: flex;
  align-items: center;
  color: #00000086;
  font-size: 16px;
  font-weight: 300;
  margin-top: 20px;
}

.resend_btn {
  color: #7a62eb;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 5px;
}

.resend_btn_loader {
  margin-left: 15px;
}
</style>
