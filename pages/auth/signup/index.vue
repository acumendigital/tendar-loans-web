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
        <div class="rhs">
          <p class="auth_text">
            Already have an account? <br /><span
              class="signup_btn"
              @click="navigateTo('/auth/login')"
              >Sign in</span
            >
          </p>
        </div>
      </div>
      <p class="welcome_text">Get started now</p>
      <p class="instruction_text">Create an account with us to continue</p>
      <!-- <div class="signin-form-ctn"> -->
      <div class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            placeholder="Enter your email"
          />
        </div>
        <div class="form-group">
          <label for="phone">Phone number</label>
          <div class="custom_phone_input">
            <div class="country_code">
              <p>+234</p>
            </div>
            <input
              id="phone"
              v-model="phone"
              type="number"
              name="phone"
              placeholder="Enter your phone number"
            />
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <SecretKeyInput
            id="password"
            placeholder=""
            :copy-needed="false"
            :current-key="password"
            @keyup.enter="signIn()"
            @update-value="updateValue($event)"
          />
        </div>
        <p class="terms_privacy_text">
          By clicking continue, you agree to
          <span class="link_text">Tendar’s Terms of Service</span> and
          <span class="link_text">Privacy Policy</span>.
        </p>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="signUp()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <ModalEnterOTP
      v-if="showOtpModal"
      @close-modal="showOtpModal = false"
      :email="email"
    />
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
});

import axios from "axios";
const route = useRoute();
const config = useRuntimeConfig();
const toast = useToast();
const encryptionKey = config.public.ENCRYPTION_KEY;

const email = ref("");
const phone = ref("");
const password = ref("");
const showOtpModal = ref(route.query?.emailToVerify || false);
const loading = ref(false);

const tokenStore = useUserStore();

const updateValue = (e) => {
  password.value = e;
};

// const signUp = () => {
//   showOtpModal.value = true;
//   navigateTo({
//     path: "/auth/signup",
//     query: {
//       emailToVerify: email.value.trim(),
//     },
//   });
// };

const signUp = () => {
  loading.value = true;
  const encrptedPassword = functions.encryptData(password.value, encryptionKey);
  console.log(encrptedPassword);
  // password.value =
  //   "e03a6564a8d8c15dafd6389680a3933a5ed8720fb6ecdf5bc447601d8b67ecb4f0200b35000fc4";
  const phoneNum = `+234${phone.value}`;
  console.log(phoneNum);
  const data = {
    email: email.value.trim(),
    phone: phoneNum,
    password: encrptedPassword,
  };
  // const path = "user/register";
  axios
    .post("user/register", data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      const token = onfulfilled.data.data.token;
      const api_token = onfulfilled.data.data.api_token;
      tokenStore.token = token;
      tokenStore.apiToken = api_token;
      toast.add({ title: "Registration Successfull!", color: "green" });
      showOtpModal.value = true;
      navigateTo({
        path: "/auth/signup",
        query: {
          emailToVerify: email.value.trim(),
        },
      });
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
  width: 30vw;
  min-width: 500px;
  height: auto;
  min-height: fit-content;
  padding: 40px 30px 50px 50px;
  border-radius: 10px;
  margin-top: 120px;
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
  margin-bottom: 50px;
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

.custom_phone_input {
  display: flex;
  align-items: center;
  border: var(--input-border-width) solid var(--border-two);
  font-size: 14px;
  width: 100%;
  height: 45px;
  /* padding: var(--input-padding); */
  background: var(--input-bg);
  border-radius: var(--input-border-radius);
  -webkit-border-radius: var(--input-border-radius);
  -moz-border-radius: var(--input-border-radius);
  -ms-border-radius: var(--input-border-radius);
  -o-border-radius: var(--input-border-radius);
}

.country_code {
  padding: 0 15px;
  /* background-color: #bcc7d3; */
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #bcc7d3;
  /* width: 100%; */
}

.country_code p {
  font-size: 14px;
}

.custom_phone_input input {
  border: none !important;
  height: 100%;
  /* flex-basis: 85%; */
  width: 100%;
}

.custom_phone_input input:focus {
  border: none !important;
  outline: none !important;
}
</style>
