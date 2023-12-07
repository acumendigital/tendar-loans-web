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
      <p class="welcome_text">Create PIN</p>
      <!-- <p class="instruction_text">Enter your bank account details</p> -->
      <div class="form">
        <div class="pin_ctn">
          <div class="form-group">
            <label for="email">New PIN</label>
            <OTPInput inputs="4" @input="handleNewPinChange($event)" />
          </div>
          <div class="form-group">
            <label for="email">Confirm PIN</label>
            <OTPInput inputs="4" @input="handleConfirmPinChange($event)" />
          </div>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="signIn()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="navigateTo('/dashboard')">Skip, continue to dashboard</p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "authlayout",
});

const newPin = ref("");
const confirmPin = ref("");
const loading = ref(false);

const handleNewPinChange = (value) => {
  newPin.value = value;
  console.log(newPin.value);
};

const handleConfirmPinChange = (value) => {
  confirmPin.value = value;
  console.log(confirmPin.value);
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
  text-align: center;
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
  width: 80%;
  margin: auto;
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

.pin_ctn {
  width: 80%;
  margin: auto;
}
</style>
