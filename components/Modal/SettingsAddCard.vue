<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <h1 class="modal_title">Add new card</h1>
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <p class="modal_subtitle">Enter your new bank account details below</p>
      <div class="modal_content">
        <div class="form">
          <div class="form-group">
            <label for="">Card number</label>
            <input
              class="amount_input"
              id="cardNumber"
              v-model="cardNumber"
              type="number"
              name="cardNumber"
              placeholder="Enter your Card Number"
            />
          </div>
          <div class="form_group_flex">
            <div class="form-group">
              <label class="form_label" for="exp">Expiry date</label>
              <input
                id="exp"
                v-model="exp"
                type="text"
                name="exp"
                placeholder="MM/YY"
              />
            </div>
            <div class="form-group">
              <label class="form_label" for="cvv">CVV</label>
              <input
                id="cvv"
                v-model="cvv"
                type="text"
                name="cvv"
                placeholder="***"
              />
            </div>
          </div>
          <div class="form-group">
            <label for="">Card holder name</label>
            <input
              class="amount_input"
              id="cardName"
              v-model="cardName"
              type="number"
              name="cardName"
              placeholder="Holder name"
            />
          </div>
          <div class="btn-div">
            <button
              v-if="!loading"
              class="action-btn"
              @click="$emit('proceed')"
            >
              Continue
            </button>
            <button v-else class="action-btn" disabled>
              <BtnLoader color="#fff" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";

const accountNumber = ref("");
const cardNumber = ref("");
const cardName = ref("");
const exp = ref("");
const cvv = ref("");
const loading = ref(false);

const sendOtp = () => {
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
  max-width: 550px;
  width: 30%;
  height: fit-content;
  align-items: center;
  border-radius: 20px;
  overflow-y: auto;
  padding: 40px 4rem 60px;
}

.top_section {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* padding-bottom: 20px; */
}

.modal_title {
  color: #021c3e;
  /* text-align: center; */
  font-size: 26px;
  font-weight: 700;
  margin-top: 1.5rem;
}

.modal_subtitle {
  color: #808d9f;
  /* text-align: center; */
  font-size: 16px;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #7a62eb;
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

.form {
  margin-top: 4vh;
}

.link_text {
  color: var(--primary-purple);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  margin-top: 20px;
}

.form_group_flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form_group_flex div {
  flex-basis: 48%;
  margin: 0;
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
