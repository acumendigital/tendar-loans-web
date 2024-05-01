<template>
  <div class="section_ctn">
    <p class="section_title">Pin Management</p>
    <TabHeaders
      v-if="true"
      :tabs="['Password', 'PIN']"
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
              @update-value="updateCurrentValue($event)"
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
              @update-value="updateNewValue($event)"
            />
          </div>
          <div class="form-group">
            <label for="password">Confirm Password</label>
            <SecretKeyInput
              id="password"
              placeholder=""
              :copy-needed="false"
              :current-key="confirmPassword"
              @keyup.enter="signIn()"
              @update-value="updateConfirmValue($event)"
            />
          </div>
          <div class="btn-div">
            <button v-if="!loading" class="action-btn" @click="savePassword()">
              Update
            </button>
            <button v-else class="action-btn" disabled>
              <BtnLoader color="#fff" />
            </button>
          </div>
        </div>
      </div>
      <div v-if="activeTab === 'PIN'" class="">
        <div class="pin_form">
          <div class="pin_ctn">
            <div class="form-group">
              <label for="email">Current PIN</label>
              <OTPInput inputs="6" @inputs="handleCurrentPinChange($event)" />
            </div>
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
            <button v-if="!loading" class="action-btn" @click="savePin()">
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
import axios from "axios";
const route = useRoute();
const config = useRuntimeConfig();
const toast = useToast();
const encryptionKey = config.public.ENCRYPTION_KEY;
const activeTab = ref(route.query?.type || "Password");

const setActiveTab = (tab) => {
  activeTab.value = tab;
  const query = {
    ...route.query,
    type: tab,
  };
  navigateTo({
    path: "/settings",
    query: query,
  });
};

const newPassword = ref("");
const confirmPassword = ref("");
const currentPassword = ref("");
const newPin = ref("");
const confirmPin = ref("");
const currentPin = ref("");
const loading = ref(false);

const updateCurrentValue = (e) => {
  currentPassword.value = e;
};

const updateNewValue = (e) => {
  newPassword.value = e;
};

const updateConfirmValue = (e) => {
  confirmPassword.value = e;
};

const handleCurrentPinChange = (value) => {
  currentPin.value = value;
};

const handleNewPinChange = (value) => {
  newPin.value = value;
};

const handleConfirmPinChange = (value) => {
  confirmPin.value = value;
};

const savePassword = () => {
  if (
    currentPassword.value === "" ||
    newPassword.value === "" ||
    confirmPassword.value === ""
  ) {
    toast.add({
      title: "Incomplete feilds",
      color: "red",
    });
  } else if (newPassword.value !== confirmPassword.value) {
    toast.add({
      title: "Incorrect confirm password",
      color: "red",
    });
  } else if (newPassword.value === confirmPassword.value) {
    loading.value = true;
    const encrptedOldPassword = functions.encryptData(
      currentPassword.value,
      encryptionKey
    );
    const encrptedNewPassword = functions.encryptData(
      newPassword.value,
      encryptionKey
    );
    const data = {
      old_password: encrptedOldPassword,
      new_password: encrptedNewPassword,
    };
    axios
      .post("user/password/change", data)
      .then((onfulfilled) => {
        toast.add({ title: "Password changed!", color: "green" });
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
  } else {
  }
};

const savePin = () => {
  if (
    currentPin.value === "" ||
    newPin.value === "" ||
    confirmPin.value === ""
  ) {
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
    const encrptedOldPin = functions.encryptData(
      currentPin.value,
      encryptionKey
    );
    const encrptedNewPin = functions.encryptData(newPin.value, encryptionKey);
    const data = {
      old_pin: encrptedOldPin,
      new_pin: encrptedNewPin,
    };
    axios
      .post("user/pin/change", data)
      .then((onfulfilled) => {
        toast.add({ title: "Pin Changed", color: "green" });
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
