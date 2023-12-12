<template>
  <div class="section_ctn">
    <p class="section_title">Security</p>
    <TabHeaders
      v-if="true"
      :tabs="['Password', 'Pin']"
      :active-tab="activeTab"
      @set-active-tab="setActiveTab"
    />
    <div class="security_content">
      <div v-if="activeTab === 'Password'" class="password_ctn">
        <div class="form">
          <div class="form-group">
            <label for="password">Current Password</label>
            <SecretKeyInput
              id="password"
              placeholder=""
              :copy-needed="false"
              :current-key="currentPassword"
              @keyup.enter="signIn()"
              @update-value="updateValue($event)"
            />
          </div>
          <div class="form-group">
            <label for="password">New Password</label>
            <SecretKeyInput
              id="password"
              placeholder=""
              :copy-needed="false"
              :current-key="newPassword"
              @keyup.enter="signIn()"
              @update-value="updateValue($event)"
            />
          </div>
          <div class="form-group">
            <label for="password">Current Password</label>
            <SecretKeyInput
              id="password"
              placeholder=""
              :copy-needed="false"
              :current-key="password"
              @keyup.enter="signIn()"
              @update-value="updateValue($event)"
            />
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'Pin'" class="">
        <div class="pin_form">
          <div class="pin_ctn">
            <div class="form-group">
              <label for="email">Current PIN</label>
              <OTPInput inputs="4" @inputs="handleCurrentPinChange($event)" />
            </div>
            <div class="form-group">
              <label for="email">New PIN</label>
              <OTPInput inputs="4" @inputs="handleNewPinChange($event)" />
            </div>
            <div class="form-group">
              <label for="email">Confirm PIN</label>
              <OTPInput inputs="4" @inputs="handleConfirmPinChange($event)" />
            </div>
          </div>
          <div class="btn-div">
            <button v-if="!loading" class="action-btn" @click="save()">
              Update
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
const activeTab = ref("Password");

const setActiveTab = (tab) => {
  activeTab.value = tab;
};

const newPin = ref("");
const confirmPin = ref("");
const currentPin = ref("");
const loading = ref(false);

const handleCurrentPinChange = (value) => {
  currentPin.value = value;
};

const handleNewPinChange = (value) => {
  newPin.value = value;
};

const handleConfirmPinChange = (value) => {
  confirmPin.value = value;
};

const save = () => {
  if (newPin.value === confirmPin.value) {
    loading.value = true;
    console.log(loading.value);
    newPin.value =
      "71fe25b4bc4807bc40acfe54ad0f68e86a023a8b1a35494420f5b7d403cca51d2fe3ad48";
    console.log(newPin.value);
    const data = {
      pin: newPin.value,
    };
    console.log(data);
    axios
      .post("user/pin/set", data)
      .then((onfulfilled) => {
        console.log(onfulfilled);
        navigateTo("/dashboard");
        // }
      })
      .catch((_err) => {
        const errorMsg = _err?.response?.data?.message || _err?.message;
        if (errorMsg) {
          this.$toast.error(errorMsg);
        } else {
          this.$toast.error(
            "Oops, something went wrong, please try again later"
          );
        }
      })
      .finally(() => {
        loading.value = false;
      });
  } else {
  }
};
</script>

<style scoped>
.section_ctn {
  padding: 0 50px;
  animation: come-up-sm 0.4s ease-in-out forwards;
  -webkit-animation: come-up-sm 0.4s ease-in-out forwards;
}

.section_title {
  color: #021c3e;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}

.security_content {
  margin-top: 40px;
}

.password_ctn {
  width: 60%;
}

.form-group {
  margin-bottom: 20px;
}

.pin_form {
  width: 55%;
}

.pin_ctn {
  width: 45%;
  margin-bottom: 40px;
}
</style>
