<template>
    <div class="page-form-ctn">
        <p class="hello-text">Forgot password</p>
        <p class="instruction-text">Please enter your email, a reset OTP will be sent to you soon</p>
        <div class="form">
            <div class="form-group">
                <label for="email">Email</label>
                <input
                id="email"
                v-model="email_name"
                type="text"
                name="email"
                placeholder="Enter your username or email"
                />
            </div>
            <p v-if="sendClicked && !email_name" class="error-text">This field is reqired</p>
            <div class="btn-div">
                <button v-if="!loading" class="action-btn" @click="sendOtp()">
                Submit
                </button>
                <button v-else class="action-btn" disabled>
                <BtnLoader color="#fff" />
                </button>
            </div>
            <div class="cancel-action-text" @click="$router.go(-1)">Cancel</div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'authLayout',
        data() {
            return {
                email_name: '',
                emailError: false,
                loading: false,
                sendClicked: false
            }
        },
        methods: {
            sendOtp() {
                this.sendClicked = true
                if(this.email_name.trim() !== '') {
                    this.loading = true
                    const data = {
                        email: this.email_name
                    }
                    this.$axios({
                    url: '/admin/auth/sendResetOTP/email/password',
                    method: 'POST',
                    data
                    })
                    .then((onfulfilled) => {
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
                        // this.$toast.success(onfulfilled.data.message, {duration: 4000})
                        this.$router.push('/auth/password/reset-password')
                    })
                    .catch((_err) => {
                    const errorMsg = _err?.response?.data?.message || _err?.message
                    if (errorMsg) {
                        this.$toast.error(errorMsg, {
                        duration: 4000 })
                    } else {
                        this.$toast.error(
                        'Oops, something went wrong, please try again later', {
                        duration: 4000 }
                        )
                    }
                    })
                    .finally(() => {
                    this.loading = false
                    })
                }
            },
        }
    }
</script>

<style scoped>
.action-btn {
  width: 100%;
}

.action-btn:hover {
  border: 1px solid var(--primary-purple);
  background: var(--primary-purple);
  color: #fff;
}

.error-text {
    margin-top: -1.7vh;
}
</style>