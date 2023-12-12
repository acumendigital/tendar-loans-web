<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="modal-backdrop" @click="$emit('close-modal')">
    <div class="modal reveals" @click.stop>
      <div class="top_section">
        <div />
        <span
          class="material-icons-outlined close"
          @click="$emit('close-modal')"
        >
          close
        </span>
      </div>
      <div class="modal_content">
        <div class="modal_icon">
          <svg
            width="61"
            height="61"
            viewBox="0 0 61 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_16213_12118)">
              <path
                d="M58.7842 8.79699C57.9016 7.91281 56.4694 7.91129 55.5868 8.79324L28.4587 35.8497L18.671 25.2193C17.8252 24.3012 16.3953 24.2417 15.4757 25.0873C14.5569 25.9331 14.498 27.3637 15.3438 28.2826L26.7257 40.6436C27.1426 41.0967 27.7259 41.3598 28.341 41.3725C28.3576 41.3732 28.3735 41.3732 28.3893 41.3732C28.9871 41.3732 29.5621 41.1358 29.9858 40.7137L58.7798 11.9952C59.6647 11.1133 59.6662 9.68117 58.7842 8.79699Z"
                fill="#7A62EB"
              />
              <path
                d="M58.2386 28.3324C56.9896 28.3324 55.9774 29.3446 55.9774 30.5938C55.9774 44.6425 44.5488 56.0711 30.5 56.0711C16.452 56.0711 5.02262 44.6425 5.02262 30.5938C5.02262 16.5458 16.452 5.11637 30.5 5.11637C31.749 5.11637 32.7614 4.1041 32.7614 2.85512C32.7614 1.60602 31.749 0.59375 30.5 0.59375C13.9578 0.59375 0.5 14.0516 0.5 30.5938C0.5 47.1352 13.9578 60.5938 30.5 60.5938C47.0415 60.5938 60.5 47.1352 60.5 30.5938C60.5 29.3448 59.4877 28.3324 58.2386 28.3324Z"
                fill="#7A62EB"
              />
            </g>
            <defs>
              <clipPath id="clip0_16213_12118">
                <rect
                  width="60"
                  height="60"
                  fill="white"
                  transform="translate(0.5 0.59375)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p class="title">
          Loan Approved!
        </p>
        <p class="sub_title">
          Congratulations, your loan has been approved and will be transferred to your wallet shortly.
        </p>
        <p class="counter">
          Redirecting in <span>0.0{{ countdown }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      error: false,
      loading: false,
      email: '',
      countdown: 5
    }
  },
  // created () {
  //   setTimeout(() => {
  //     this.$router.push('/')
  //   }, 3000)
  // },

  mounted () {
    this.startCountdown()
  },
  methods: {
    startCountdown () {
      const interval = setInterval(() => {
        if (this.countdown > 1) {
          this.countdown--
        } else {
          this.countdown = 0
          clearInterval(interval)
          // this.$router.push('/')
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.modal-backdrop {
  z-index: 3;
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
  width: 40%;
  max-width: 550px;
  height: fit-content;
  align-items: center;
  border-radius: 10px;
  overflow-y: auto;
  padding: 4rem 4rem;
  text-align: center;
}

.top_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 3rem; */
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 20px;
}

.title {
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  color: #021c3e;
  margin-top: 40px;
  margin-bottom: 10px;
}

.sub_title {
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  color: #808d9f;
  width: 85%;
  margin: auto;
  margin-bottom: 20px;
}

.counter {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: #808d9f;
  margin-bottom: 20px;
}

.counter span {
  color: #7A62EB;
  font-size: 14px;
  font-weight: 400;
}

.close {
  position: absolute;
  cursor: pointer;
  color: #7A62EB;
  right: 2rem;
  top: 2rem;
}

.modal_content {
  margin-top: 10px;
}

.modal_icon svg {
  margin: auto;
}

.input_ctn {
  width: 100%;
  margin-top: 40px;
}

.form_input {
  border: 1px solid #bcc7d3;
  background-color: #f9fafc;
  height: 50px;
  border-radius: 100px;
  outline: none;
  width: 100%;
  margin-top: 20px;
  padding: 0 30px;
  font-size: 16px;
  font-weight: 400;
  color: #808d9f;
  text-align: center;
}

.btn {
  margin-top: 2.5rem;
  border: none;
  background-color: #7A62EB;
  height: 45px;
  border-radius: 100px;
  font-size: 20px;
  font-weight: 600;
  width: 17rem;
  cursor: pointer;
  margin-bottom: 30px;
}

::placeholder {
  color: #808d9f41;
}

.error_input {
  border: 1.5px solid red;
}

@media only screen and (max-width: 1200px) {
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
