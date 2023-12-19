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
      </div>
      <p class="welcome_text">Verify your identity</p>
      <p class="instruction_text">
        Instantly verify your identity for secure access.
      </p>
      <!-- <div class="signin-form-ctn"> -->
      <div class="form">
        <div class="modal-input-field form-group">
          <label class="form_label" for="gender">Select your preference</label>
          <select id="gender" v-model="preference" name="gender" @change="clearInput">
            <option value="">Select</option>
            <option value="bvn">BVN</option>
            <option value="nin">NIN</option>
          </select>
          <!-- </div> -->
          <!-- <div
              :class="submitClicked && !gender ? '' : 'not-vis'"
              class="error-text"
            >
              This field is required
            </div> -->
        </div>
        <div v-if="preference === 'bvn'" class="form-group">
          <label for="acct_num">BVN</label>
          <input
            id="acct_num"
            v-model="bvn"
            type="text"
            name="acct_num"
            placeholder="Enter your BVN"
          />
        </div>
        <div v-if="preference === 'nin'" class="form-group">
          <label for="acct_num">NIN</label>
          <input
            id="acct_num"
            v-model="nin"
            type="text"
            name="acct_num"
            placeholder="Enter your NIN"
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
        <!-- <p class="link_text">I’ll do this later</p> -->
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
const toast = useToast();
const preference = ref("");
const nin = ref("");
const bvn = ref("");
const showPassword = ref(false);
const loading = ref(false);

const clearInput = () => {
  nin.value = ''
  bvn.value = ''
}

const save = () => {
  loading.value = true;
  console.log(loading.value);
  const data = {
    type: preference.value,
    number: nin.value || bvn.value,
  };
  console.log(data);
  axios
    .post("identity/create", data)
    .then((onfulfilled) => {
      const data = onfulfilled?.data?.message
      toast.add({ title: data, color: "green" });
      console.log(onfulfilled);
      const phone = onfulfilled.data.data.identity.phone_number
      navigateTo(`/user/verify-identity/enter-otp?phone=${phone}`);
      // }
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

.payment_logo {
  width: 60%;
  text-align: right;
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

.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}
</style>
