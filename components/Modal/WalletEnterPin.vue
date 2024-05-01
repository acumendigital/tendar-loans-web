<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Enter PIN</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">
        Please enter your pin to confirm this transaction
      </p>
      <div class="modal_content">
        <div class="otp_ctn">
          <OTPInput inputs="4" @inputs="handlePINChange($event)" />
        </div>
        <div class="bottom_link">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const emit = defineEmits(["proceed"]);
const props = defineProps({
  email: {
    type: String,
    default: () => "",
  },
});

const pin = ref("");
const loading = ref(false);
const resendLoading = ref(false);

const handlePINChange = (value) => {
  pin.value = value;

  if (pin.value.length === 4) {
    emit("proceed");
  }
};

const createPin = () => {
  navigateTo("/settings?tab=Security&type=Pin");
};

const sendPin = () => {
  loading.value = true;
  const data = {
    email: email.value,
    token: otp.value,
  };
  const path = "user/email/verify";
  axios
    .post("user/email/verify", data)
    .then((onfulfilled) => {
      navigateTo("/user/create-profile");
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
  max-width: 600px;
  width: 35%;
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
  color: #7a62eb;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  width: 70%;
  margin: auto;
}

.otp_ctn {
  padding-top: 10px;
  padding-bottom: 10px;
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

@media only screen and (max-width: 1400px) {
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
