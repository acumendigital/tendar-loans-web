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
            v-model="email"
            type="text"
            name="email"
            placeholder="Enter your username or email"
          />
        </div>
        <p v-if="submitClicked && !email" class="error-text">
          This field is reqired
        </p>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="sendEmail()">
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
  layout: "auth-layout",
});

import axios from "axios";
const toast = useToast();
const email = ref("");
const loading = ref(false);
const submitClicked = ref(false);

const sendEmail = () => {
  submitClicked.value = true;
  if (email.value) {
    loading.value = true;
    const data = {
      email: email.value,
    };
    axios
      .post("auth/password/reset/send-email", data)
      .then((onfulfilled) => {
        toast.add({ title: "Reset password email sent", color: "green" });
        navigateTo(`/auth/password/reset-password?email=${email.value}`);
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
  margin-top: 160px;
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
