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
      <div v-if="activeTab === 'Pin'" class="pin_ctn">
        <div class="form-group">
          <label for="sms">Current PIN</label>
          <!-- <OTPInput inputs="6" @input="handleSMSOTPChange($event)" /> -->
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
</style>
