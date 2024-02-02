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
            v-if="props.type === 'successful'"
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
          <svg
            v-if="props.type === 'unsuccessful'"
            xmlns="http://www.w3.org/2000/svg"
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
          >
            <g clip-path="url(#clip0_18892_16387)">
              <path
                d="M29.197 60H7.64321C5.75286 60 3.93993 59.2491 2.60325 57.9124C1.26656 56.5757 0.515625 54.7628 0.515625 52.8724L0.515625 7.12758C0.515625 5.23723 1.26656 3.4243 2.60325 2.08762C3.93993 0.75094 5.75286 0 7.64321 0L40.6439 0C42.5343 0 44.3472 0.75094 45.6839 2.08762C47.0206 3.4243 47.7715 5.23723 47.7715 7.12758V28.5103C47.7926 28.7336 47.7668 28.9589 47.6958 29.1717C47.6248 29.3844 47.5101 29.58 47.3591 29.7459C47.2082 29.9118 47.0242 30.0443 46.8191 30.135C46.6139 30.2257 46.3921 30.2725 46.1678 30.2725C45.9435 30.2725 45.7217 30.2257 45.5165 30.135C45.3114 30.0443 45.1274 29.9118 44.9765 29.7459C44.8255 29.58 44.7108 29.3844 44.6398 29.1717C44.5688 28.9589 44.543 28.7336 44.5641 28.5103V7.12758C44.5641 6.61907 44.4637 6.11555 44.2687 5.64592C44.0736 5.17629 43.7878 4.74978 43.4276 4.39087C43.0673 4.03196 42.6398 3.7477 42.1694 3.5544C41.6991 3.3611 41.1952 3.26256 40.6867 3.26443H7.64321C7.13231 3.25878 6.62535 3.35452 6.15171 3.54613C5.67806 3.73774 5.24713 4.0214 4.88386 4.38069C4.52059 4.73998 4.2322 5.16777 4.03539 5.63928C3.83858 6.11078 3.73726 6.61665 3.73729 7.12758V52.9152C3.73726 53.4261 3.83858 53.932 4.03539 54.4035C4.2322 54.875 4.52059 55.3028 4.88386 55.6621C5.24713 56.0214 5.67806 56.305 6.15171 56.4966C6.62535 56.6882 7.13231 56.784 7.64321 56.7783H29.197C29.6242 56.7783 30.034 56.948 30.3361 57.2501C30.6381 57.5522 30.8079 57.9619 30.8079 58.3892C30.8079 58.8164 30.6381 59.2261 30.3361 59.5282C30.034 59.8303 29.6242 60 29.197 60Z"
                fill="#D73C27"
              />
              <path
                d="M37.6517 17.2204H10.5669C10.3436 17.2415 10.1183 17.2157 9.90557 17.1447C9.6928 17.0737 9.49722 16.959 9.33133 16.808C9.16544 16.6571 9.03291 16.4731 8.94222 16.268C8.85153 16.0628 8.80469 15.841 8.80469 15.6167C8.80469 15.3924 8.85153 15.1706 8.94222 14.9654C9.03291 14.7603 9.16544 14.5763 9.33133 14.4253C9.49722 14.2744 9.6928 14.1597 9.90557 14.0887C10.1183 14.0177 10.3436 13.9919 10.5669 14.013H37.6517C38.0509 14.0507 38.4218 14.2359 38.6917 14.5325C38.9616 14.8291 39.1112 15.2157 39.1112 15.6167C39.1112 16.0177 38.9616 16.4043 38.6917 16.7009C38.4218 16.9975 38.0509 17.1827 37.6517 17.2204Z"
                fill="#D73C27"
              />
              <path
                d="M25.5075 29.7353H10.6108C10.1836 29.7353 9.77389 29.5656 9.4718 29.2635C9.16971 28.9614 9 28.5517 9 28.1245C9 27.6973 9.16971 27.2876 9.4718 26.9855C9.77389 26.6834 10.1836 26.5137 10.6108 26.5137H25.5075C25.9347 26.5137 26.3444 26.6834 26.6465 26.9855C26.9486 27.2876 27.1183 27.6973 27.1183 28.1245C27.1183 28.5517 26.9486 28.9614 26.6465 29.2635C26.3444 29.5656 25.9347 29.7353 25.5075 29.7353Z"
                fill="#D73C27"
              />
              <path
                d="M58.8763 59.9999C58.6668 59.9999 58.4593 59.9583 58.266 59.8776C58.0727 59.7968 57.8973 59.6785 57.7501 59.5294L33.887 35.6378C33.6967 35.5005 33.5388 35.3233 33.4242 35.1187C33.3095 34.914 33.241 34.6868 33.2233 34.4529C33.2057 34.2189 33.2393 33.984 33.3219 33.7644C33.4045 33.5449 33.534 33.346 33.7015 33.1817C33.8689 33.0174 34.0702 32.8917 34.2913 32.8133C34.5124 32.7349 34.7479 32.7058 34.9815 32.7279C35.215 32.75 35.4409 32.8229 35.6433 32.9414C35.8458 33.0599 36.0199 33.2212 36.1535 33.414L60.0167 57.2629C60.2377 57.4889 60.3873 57.7749 60.4469 58.0853C60.5065 58.3957 60.4735 58.7168 60.3519 59.0086C60.2303 59.3004 60.0256 59.5499 59.7632 59.7262C59.5008 59.9025 59.1924 59.9976 58.8763 59.9999Z"
                fill="#D73C27"
              />
              <path
                d="M35.0305 59.9995C34.8188 59.9998 34.6091 59.9585 34.4134 59.8777C34.2178 59.797 34.0399 59.6785 33.8901 59.529C33.5949 59.2256 33.4297 58.819 33.4297 58.3957C33.4297 57.9724 33.5949 57.5658 33.8901 57.2625L57.7532 33.4136C57.8923 33.2381 58.0666 33.0938 58.2651 32.9901C58.4635 32.8865 58.6815 32.8257 58.905 32.8117C59.1284 32.7977 59.3523 32.8309 59.5621 32.9091C59.7719 32.9873 59.9628 33.1087 60.1227 33.2655C60.2825 33.4223 60.4075 33.611 60.4897 33.8192C60.5718 34.0275 60.6093 34.2507 60.5996 34.4744C60.5899 34.698 60.5333 34.9172 60.4334 35.1175C60.3335 35.3179 60.1926 35.495 60.0198 35.6374L36.1566 59.529C35.8575 59.8275 35.453 59.9964 35.0305 59.9995Z"
                fill="#D73C27"
              />
            </g>
            <defs>
              <clipPath id="clip0_18892_16387">
                <rect
                  width="60"
                  height="60"
                  fill="white"
                  transform="translate(0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p class="title">{{ props.title }}</p>
        <p class="sub_title">
          {{ props.subTitle }}
        </p>
        <p class="counter">
          Redirecting in <span>0.0{{ countdown }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: () => "successful",
  },
  title: {
    type: String,
    default: () => "",
  },
  subTitle: {
    type: String,
    default: () => "",
  },
});
const error = ref(false);
const loading = ref(false);
const email = ref("");
const countdown = ref(10);

const startCountdown = () => {
  const interval = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--;
    } else {
      countdown.value = 0;
      clearInterval(interval);
      window.location.reload()
    }
  }, 1000);
};

startCountdown();
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
  color: #7a62eb;
  font-size: 14px;
  font-weight: 400;
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
  background-color: #7a62eb;
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
