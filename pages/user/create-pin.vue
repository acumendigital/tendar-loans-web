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
      </div>
      <p class="welcome_text">Create your PIN</p>
      <!-- <p class="instruction_text">Enter your bank account details</p> -->
      <div class="form">
        <div class="pin_ctn">
          <div class="form-group">
            <label for="email">New PIN</label>
            <OTPInput inputs="6" @inputs="handleNewPinChange($event)" />
          </div>
          <div class="form-group">
            <label for="email">Confirm PIN</label>
            <OTPInput inputs="6" @inputs="handleConfirmPinChange($event)" />
          </div>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save()">
            Create PIN
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <p class="link_text" @click="navigateTo('/auth/login')">
          Skip, continue to login
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "auth-layout",
});

import axios from "axios";
const route = useRoute();
const toast = useToast();
const config = useRuntimeConfig();
const encryptionKey = config.public.ENCRYPTION_KEY;
const newPin = ref("");
const confirmPin = ref("");
const loading = ref(false);

const handleNewPinChange = (value) => {
  newPin.value = value;
  console.log(value);
  console.log(newPin.value);
};

const handleConfirmPinChange = (value) => {
  confirmPin.value = value;
  console.log(confirmPin.value);
};

const save = () => {
  const fallBackUrl = route.query?.fallBackUrl;
  console.log(fallBackUrl);
  if (newPin.value === "" || confirmPin.value === "") {
    toast.add({
      title: "Incomplete feilds",
      color: "red",
    });
  } else if (newPin.value !== confirmPin.value) {
    toast.add({
      title: "Incorrect confirm pin",
      color: "red",
    });
  } else if (newPin.value === confirmPin.value) {
    loading.value = true;
    const encrptedPin = functions.encryptData(newPin.value, encryptionKey);
    // console.log(encrptedPin);
    // newPin.value =
    //   "71fe25b4bc4807bc40acfe54ad0f68e86a023a8b1a35494420f5b7d403cca51d2fe3ad48";
    const data = {
      pin: encrptedPin,
    };
    console.log(data);
    axios
      .post("user/pin/set", data)
      .then((onfulfilled) => {
        console.log(onfulfilled);
        if (fallBackUrl) {
          toast.add({ title: "Pin Created", color: "green" });
          navigateTo(fallBackUrl);
        } else {
          toast.add({ title: "Pin Created, Please login", color: "green" });
          navigateTo("/auth/login");
        }
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
  padding: 40px 30px 50px 70px;
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

.pin_ctn {
  width: 75%;
  /* margin: auto; */
}
</style>
