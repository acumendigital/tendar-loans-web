<template>
  <div class="section_ctn">
    <p class="section_title">Cards</p>
    <p v-if="!addCardLoading" class="add_new" @click="addCard()">
      Add new card
      <span v-if="deleteLoading" class="delete_loader"
        ><BtnLoader color="#7a62eb" size="20"
      /></span>
    </p>
    <div v-else class="add_new"><BtnLoader color="#7a62eb" size="20" /></div>
    <div v-if="!loading" class="management_content">
      <div v-if="cards.length">
        <div v-for="(card, index) in cards" :key="index" class="bank_ctn">
          <div class="bank_box">
            <div class="box_lhs">
              <div class="bank_logo">
                <img
                  v-if="card.card_type === 'visa'"
                  src="~assets/images/visa_log.png"
                  alt=""
                />
                <img
                  v-if="card.card_type === 'mastercard'"
                  src="~assets/images/master-card_logo.png"
                  alt=""
                />
                <img
                  v-if="card.card_type === 'verve'"
                  src="~assets/images/verve_logo.png"
                  alt=""
                />
              </div>
              <div>
                <!-- <p class="bank_acct_num_title">Account Number</p> -->
                <p class="bank_acct_num">******{{ card.last_4_digits }}</p>
                <p class="bank_exp_date">
                  Expires: {{ card.exp_month }}/{{ card.exp_year }}
                </p>
              </div>
            </div>
            <div class="box_rhs">
              <p v-if="card.is_default" class="bank_default">Default</p>
              <p v-else class="set_bank_default" @click="setDefault(card.id)">Set as Default</p>
            </div>
          </div>
          <div v-if="!card.is_default" class="delete_btn" @click="deleteCard(card.id)">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.6016 6.16016C18.2716 5.83016 14.9216 5.66016 11.5816 5.66016C9.60156 5.66016 7.62156 5.76016 5.64156 5.96016L3.60156 6.16016"
                stroke="#888F9B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.10156 5.14969L9.32156 3.83969C9.48156 2.88969 9.60156 2.17969 11.2916 2.17969H13.9116C15.6016 2.17969 15.7316 2.92969 15.8816 3.84969L16.1016 5.14969"
                stroke="#888F9B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.45 9.32031L18.8 19.3903C18.69 20.9603 18.6 22.1803 15.81 22.1803H9.39C6.6 22.1803 6.51 20.9603 6.4 19.3903L5.75 9.32031"
                stroke="#888F9B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.9297 16.6797H14.2597"
                stroke="#888F9B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.1016 12.6797H15.1016"
                stroke="#888F9B"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <TableEmpty v-else/>
    </div>
    <div v-else class="account_loader">
      <LoaderBankAccounts />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const dataStore = useUserStore();
const addCardLoading = ref(false);
const loading = ref(false);
const cards = ref([]);
const toast = useToast();

const getCards = () => {
  loading.value = true;
  axios
    .get("card/list")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      cards.value = onfulfilled.data.data.cards;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const addCard = () => {
  addCardLoading.value = true;
  const data = {
    currency: "NGN",
    success_url: "https://tendar-loans-web.vercel.app/settings?tab=Cards",
    cancel_url: "https://tendar-loans-web.vercel.app/settings?tab=Cards",
  };
  axios
    .post("card/create", data)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      dataStore.updateSetCard(true);
      const checkoutRoute = onfulfilled.data.data.card.checkout_url;
      window.location.href = checkoutRoute;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      addCardLoading.value = false;
    });
};

const deleteCard = (id) => {
  console.log(id);
  deleteLoading.value = true;
  axios
    .delete(`card/delete/${id}`)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      toast.add({ title: "Card Deleted", color: "green" });
      getCards();
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      deleteLoading.value = false;
    });
};

const setDefault = (id) => {
  console.log(id);
  deleteLoading.value = true;
  axios
    .delete(`card/set-default/${id}`)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      toast.add({ title: "Card set as default", color: "green" });
      getCards();
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      deleteLoading.value = false;
    });
};

getCards();
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

.add_new {
  display: flex;
  align-items: center;
  color: #7a62eb;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
}

.delete_loader {
  margin-left: 20px;
}

.bank_ctn {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.bank_box {
  border: 1px solid #888f9b;
  border-radius: 20px;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
}

.box_lhs {
  display: flex;
}

.bank_logo {
  /* margin-right: 10px; */
  padding-top: 5px;
}

.bank_logo img {
  width: 60%;
}

.bank_exp_date {
  color: #021c3e77;
  font-size: 16px;
  font-weight: 500;
}

.info {
  font-size: 16px;
  margin-left: 10px;
}

/* .bank_acct_num_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
} */

.bank_acct_num {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
}

.bank_default {
  /* color: var(--primary-purple); */
  font-weight: 500;
}
.set_bank_default {
  color: var(--primary-purple);
  font-weight: 500;
  cursor: pointer;
}


.delete_btn {
  margin-left: 30px;
  cursor: pointer;
}

.account_loader {
  margin-top: 20px;
}
</style>
