<template>
  <div class="page-form-ctn">
    <p class="hello-text">Hello,</p>
    <p class="instruction-text">Sign in to your account</p>
    <!-- <div class="signin-form-ctn"> -->
    <div class="form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email_name"
          type="text"
          name="email"
          placeholder="admin@email.com"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <SecretKeyInput
          id="password"
          placeholder=""
          :copy-needed="false"
          :current-key="password"
          @keyup.enter="signIn()"
          @update-value="updateValue($event)"
        />
      </div>
      <div class="forgot-pass-row">
        <div class="keep-signin">
          <CustomCheckbox />
          <label for="keep" class="keep-label">Keep me signed in</label>
        </div>
        <nuxt-link class="forgot-text" to="/auth/password/forgot-password"
          >Forgot password?</nuxt-link
        >
      </div>
      <div class="btn-div">
        <button v-if="!loading" class="action-btn" @click="signIn()">
          Sign In
        </button>
        <button v-else class="action-btn" disabled>
          <BtnLoader color="#fff" />
        </button>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
import functions from '~/utils/functions'
export default {
  layout: 'authLayout',
  data() {
    return {
      encryptData: functions.encryptData,
      email_name: '',
      password: '',
      showPassword: false,
      loading: false,
      encryption_key: this.$config.ENCRYPTION_KEY
    }
  },
  head() {
    return {
      title: 'Login | Tendar Admin',
    }
  },
  watch: {
    password(val) {
      if (this.email_name.length && val.length) {
        this.inputsFilled = false
      } else {
        this.inputsFilled = true
      }
    },
  },
  methods: {
    updateValue(e) {
      this.password = e
    },
    // signIn() {
    //   this.$router.push('/auth/login/security')
    // }
    signIn() {
      this.loading = true
      // const encrptedPassword = this.encryptData(this.password, this.encryption_key)
      // console.log(this.email_name.trim());
      // console.log(encrptedPassword)
      const data = {
        email: this.email_name.trim(),
        password: this.encryptData(this.password, this.encryption_key),
        address: '',
        longitude: null,
        latitude: null,
      }
      this.$axios({
        url: '/admin/auth/login',
        method: 'POST',
        data,
      })
        .then((onfulfilled) => {
          const data = onfulfilled?.data?.data
          // console.log(onfulfilled)
          if (
            onfulfilled.data.message ===
              'A one time token has been sent to your email address' ||
            onfulfilled.data.message ===
              'A one time token has been sent to your phone number'
          ) {
            this.$store.commit('saveEmailForOTP', this.email_name)
            this.$toast.success(onfulfilled.data.message, {
              duration: 4000,
              action: {
                icon: 'check',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0)
                },
              },
            })
            let otpAuth = ""
            if (data.email_authentication) {
              otpAuth = "email"
            } else if (data.sms_authentication) {
              otpAuth = "sms"
            }
            // console.log("david", otpAuth)
            this.$router.push(`/auth/login/security?authType=${otpAuth}`)
          } else if (
            onfulfilled.data.message === 'user signed in successfully'
          ) {
            this.$store.commit('setLoggedInState', true)
            this.$store.commit('saveUserDetails', data)
            this.$store.commit('saveToken', data.token)
            this.$store.commit('saveXApiKey', data.api_token)
            this.$store.commit('saveAdminDetails', data.admin)
            const url = this.$route.query.fallBackUrl || '/'
            this.$router.push(`${url}`)
          } else {
            this.$store.commit('setLoggedInState', true)
            this.$store.commit('saveUserDetails', data)
            this.$store.commit('saveToken', data.token)
            this.$store.commit('saveXApiKey', data.api_token)
            this.$store.commit('saveAdminDetails', data.admin)
            const url = this.$route.query.fallBackUrl || '/'
            this.$router.push(`${url}`)
          }
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
          this.loading = false
        })
    },
  },
}
</script>

<style scoped>
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
</style>
