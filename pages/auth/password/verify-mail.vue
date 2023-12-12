<template>
    <div class="page-form-ctn">
        <p class="hello-text">Verify your email</p>
        <p class="instruction-text">Please enter the OTP sent to your email for verification</p>
        <div class="form">
            <div class="form-group">
                <label for="email">Enter OTP</label>
                <input
                id="email"
                v-model="email_name"
                type="text"
                name="email"
                placeholder="Enter your username or email"
                />
            </div>
            <p v-if="emailError" class="error-text">This field is reqired</p>
            <div class="btn-div">
                <button v-if="!loading" class="action-btn" @click="sendOtp()">
                Submit
                </button>
                <button v-else class="action-btn" disabled>
                <BtnLoader color="#fff" />
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        layout: 'auth-layout',
        data() {
            return {
                email_name: '',
                emailError: false,
                loading: false
            }
        },
        methods: {
            sendOtp() {
                if(this.email_name.trim() === '') {
                    this.emailError = true
                } else {
                    this.emailError = false
                    this.$router.push('/auth/password/reset-password')
                }
            }
        },
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