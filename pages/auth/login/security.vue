<template>
  <div class="page-form-ctn">
    <p class="title">Security Verification</p>
    <p class="sub-title">To secure your account please verify it’s you</p>
    <div class="form">
      <div v-if="$route.query.authType === 'sms'" class="form-group">
        <label for="sms"
          >Enter the code sent to your Phone Number
        </label>
        <OTPInput inputs="6" @input="handleSMSOTPChange($event)" />
      </div>
      <div v-else-if="$route.query.authType === 'email'" class="form-group">
        <label for="email">Enter the code sent to your Email Address</label>
        <OTPInput inputs="6" @input="handleEmailOTPChange($event)" />
      </div>
      <div v-if="$route.query.authType === 'sms'" class="action-div">
        <button v-if="!postDataLoading" class="action-btn" :disabled="phoneInputsFilled" @click="submitOTP()">
          Submit
        </button>
        <button v-else class="action-btn" disabled>
          <BtnLoader />
        </button>
      </div>
      <div v-if="$route.query.authType === 'email'" class="action-div">
        <button v-if="!postDataLoading" class="action-btn" :disabled="emailInputsFilled" @click="submitOTP()">
          Submit
        </button>
        <button v-else class="action-btn" disabled>
          <BtnLoader />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import functions from '@/utils/functions'
export default {
  layout: 'auth-layout',
  data() {
    return {
      hideEmail: functions.hideEmail,
      loading: false,
      otp: '',
      emailOtp: '',
      postDataLoading: false,
      otpAuth: '',
    }
  },
  head() {
    return {
      title: 'Two-factor Authentication | Tendar User',
    }
  },
  computed: {
    phoneInputsFilled() {
      return this.otp.length < 4
    },
    emailInputsFilled() {
      return this.emailOtp.length < 4
    }
  },
  created () {
    const data = this.$route.query
    this.otpAuth = data.authType
  },
  methods: {
    
    handleSMSOTPChange (value) {
      this.otp = value
    },
    handleEmailOTPChange (value) {
      this.emailOtp = value
    },
    submitOTP() {
      this.postDataLoading = true
      const data = {
        email: this.$store.state.OTPEmail,
        address: '',
        longitude: null,
        latitude: null,
        email_token: this.emailOtp,
        sms_token: this.otp
      }
      this.$axios({
        url: '/admin/auth/login2FA',
        method: 'POST',
        data,
      })
        .then((onfulfilled) => {
          const data = onfulfilled?.data?.data
          this.$store.commit('setLoggedInState', true)
          this.$store.commit('saveUserDetails', data)
          this.$store.commit('saveToken', data.token)
          this.$store.commit('saveXApiKey', data.api_token)
          this.$store.commit('saveAdminDetails', data.admin)
          const url = this.$route.query.fallBackUrl || '/'
          this.$router.push(`${url}`)
        })
        .catch((_err) => {
          const errorMsg = _err?.response?.data?.message || _err?.message
          if (errorMsg) {
            this.$toast.error(errorMsg)
          } else {
            this.$toast.error(
              'Oops, something went wrong, please try again later'
            )
          }
        })
        .finally(() => {
          this.postDataLoading = false
        })
    },
  },
}
</script>

<style scoped>
.page-form-ctn {
  width: 100%;
  padding: 30px 50px;
}

.action-btn {
  width: 100%;
}

.form-group label {
  text-transform: unset;
}

.action-btn:disabled {
  opacity: 0.1;
}

label {
  cursor: unset;
}

</style>
