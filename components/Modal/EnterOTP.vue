<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Enter OTP</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">
        Please enter the verification code we sent to
        {{ props.email || "david991@gmail.com" }}
      </p>
      <div class="modal_content">
        <OTPInput inputs="6" @input="handleOTPChange($event)" />
        <div class="bottom_link">
          <p class="bottom_text">
            Didn’t get a code? <span class="resend_btn">Resend code</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
});

const otp = ref('');

const handleOTPChange = (value) => {
  otp.value = value;
  if (otp.value.length === 6) {
    console.log(otp.value);
    sendOtp()
  }
};


const sendOtp = () => {
  loading.value = true;
  // const encrptedPassword = functions.encryptData(password.value, encryptionKey.value)
  // console.log(email.value.trim());
  // console.log(encrptedPassword)
  password.value =
    "e03a6564a8d8c15dafd6389680a3933a5ed8720fb6ecdf5bc447601d8b67ecb4f0200b35000fc4";
  const data = {
    token: otp.value,
  };
  const path = "user/email/verify";
  axios
    .post(`${baseUrl}${path}`, data)
    .then((onfulfilled) => {
      // const data = onfulfilled?.data?.data
      console.log(onfulfilled);
      navigateTo('/auth/signup/add-bank')
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
</script>

<style scoped>
.modal-backdrop {
  z-index: 50;
  position: fixed;
  overflow: auto;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(24, 18, 46, 0.8);
}

.modal {
  /* margin-top: 5%; */
  position: relative;
  background-color: white;
  max-width: 550px;
  width: 30%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem;
}

.top_section {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-top: 2rem;
}

.modal_subtitle {
  color: #808d9f;
  text-align: center;
  font-size: 16px;
  margin-bottom: 2rem;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #c5c5c5;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  margin-top: 10px;
}

.input_ctn {
  width: 100%;
  margin-bottom: 20px;
}

.input_flex_item {
  flex-basis: 48%;
}

.global_btn {
  width: 100%;
  margin-top: 2rem;
}

.bottom_link {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.bottom_text {
  color: #00000086;
  font-size: 16px;
  font-weight: 300;
  text-align: center;
}

.resend_btn {
  color: #7a62eb;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .modal {
    width: 50%;
  }
}

@media only screen and (max-width: 900px) {
  .modal {
    width: 70%;
  }
}

@media only screen and (max-width: 500px) {
  .modal {
    width: 90%;
    padding: 2rem;
    height: 80vh;
  }
}
</style>
