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
        <div class="rhs">
          <p class="auth_text">
            Don’t have an account? <br /><span
              class="signup_btn"
              @click="navigateTo('/auth/signup')"
              >Sign up</span
            >
          </p>
        </div>
      </div>
      <p class="welcome_text">Welcome</p>
      <p class="instruction_text">Sign in to your account to continue</p>
      <!-- <div class="signin-form-ctn"> -->
      <div class="form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="text"
            name="email"
            placeholder="Enter your email"
          />
          <div
            :class="submitClicked && !email ? '' : 'not-vis'"
            class="error-text"
          >
            This field is required
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
          <div
            :class="submitClicked && !password ? '' : 'not-vis'"
            class="error-text"
          >
            This field is required
          </div>
        </div>
        <div class="forgot-pass-row">
          <div class="keep-signin">
            <CustomCheckbox />
            <label for="keep" class="keep-label">Keep me signed in</label>
          </div>
          <nuxt-link class="forgot-text" to="/auth/password/forgot-password"
            >Forgot password?</nuxt-link
          >
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save()">
            Sign In
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
});

import axios from "axios";
import { useUserStore } from "~/stores";
const config = useRuntimeConfig();
const toast = useToast();
const route = useRoute();
const dataStore = useUserStore();
const encryptionKey = config.public.ENCRYPTION_KEY;

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const submitClicked = ref(false);
// const encryptData = functions.encryptData;

const updateValue = (e) => {
  password.value = e;
};


const save = () => {
  submitClicked.value = true;
  if (
    email.value &&
    password.value
  ) {
    signIn();
  }
};

const signIn = () => {
  loading.value = true;
  const encrptedPassword = functions.encryptData(password.value, encryptionKey);
  const data = {
    email: email.value.trim(),
    password: encrptedPassword,
  };
  axios
    .post("auth/login", data)
    .then((onfulfilled) => {
      dataStore.resetStore();
      const token = onfulfilled.data.data.token;
      const api_token = onfulfilled.data.data.api_token;
      const user_data = onfulfilled.data.data.user;
      dataStore.updateToken(token);
      dataStore.updateApiToken(api_token);
      dataStore.updateUserData(user_data);
      let url = ''
      let successMsg = ''
      if (!user_data.email_verified) {
        successMsg = "Login Successful. Please verify your email"
        url = `/auth/signup?emailToVerify=${email.value.trim()}&from=${window.location.pathname}`
      } else if (!user_data.profile_set) {
        successMsg = "Login Successful. Please create your profile"
        url = `/user/create-profile?from=/dashboard`
      } else if (!user_data.identity_verified) {
        successMsg = "Login Successful. Please verify your identity"
        url = `/user/verify-identity?from=/dashboard`
      } else {
        successMsg = "Login Successful"
        url = route.query.fallBackUrl || "/dashboard";
      }
      toast.add({ title: successMsg, color: "green" });
      navigateTo(`${url}`);
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

.instruction_text {
  color: #021c3e73;
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
</style>
