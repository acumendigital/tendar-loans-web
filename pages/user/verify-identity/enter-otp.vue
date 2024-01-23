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
      <p class="welcome_text">Enter verification code</p>
      <p class="instruction_text">
        Please enter the code sent to Please enter the code sent to {{ route.query?.phone }}
      </p>
      <div class="form">
        <div class="pin_ctn">
          <div class="form-group">
            <label for="email">OTP</label>
            <OTPInput inputs="6" @inputs="handleOTPChange($event)" />
          </div>
        </div>
        <div class="btn-div">
          <button v-if="!loading" class="action-btn" @click="save()">
            Continue
          </button>
          <button v-else class="action-btn" disabled>
            <BtnLoader color="#fff" />
          </button>
        </div>
        <div class="bottom_link">
          <p class="bottom_text">
            Didn’t get a code?
            <span v-if="!resendLoading" class="resend_btn" @click="resendOtp()"
              >Resend code</span
            >
            <span v-else class="resend_btn_loader"
              ><BtnLoader color="#7a62eb" size="20"
            /></span>
          </p>
        </div>
        <!-- <p class="link_text" @click="navigateTo('/dashboard')">
          Skip, continue to dashboard
        </p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();
definePageMeta({
  layout: "auth-layout",
});

console.log(route);

const toast = useToast();
const otp = ref("");
const loading = ref(false);
const resendLoading = ref(false);

const handleOTPChange = (value) => {
  otp.value = value;
  if (otp.value.length === 6) {
    console.log(otp.value);
    save();
  }
};

const save = () => {
  loading.value = true;
    console.log(loading.value);
    const data = {
      token: otp.value,
    };
    console.log(data);
    axios
      .post("identity/verify", data)
      .then((onfulfilled) => {
        console.log(onfulfilled);
        toast.add({ title: "Idebtity Verified", color: "green" });
        navigateTo("/user/add-bank");
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

const resendOtp = () => {
  resendLoading.value = true;
  const data = {
    type: route.query?.type,
    number: route.query?.id,
  };
  console.log(data);
  axios
    .post("identity/create", data)
    .then((onfulfilled) => {
      const message = onfulfilled?.data?.message
      toast.add({ title: message, color: "green" });
      console.log(onfulfilled);
      const phone = onfulfilled.data.data.identity.phone_number
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
      resendLoading.value = false;
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
  margin-top: 170px;
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
  /* width: 80%; */
  margin: auto;
  margin-top: 3vh;
  padding-right: 30px;
}

.form-group {
  margin-bottom: 50px;
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


.bottom_link {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.bottom_text {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #00000086;
  font-size: 16px;
  font-weight: 300;
  /* text-align: center; */
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
