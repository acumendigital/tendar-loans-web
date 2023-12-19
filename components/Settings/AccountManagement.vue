<template>
  <div class="section_ctn">
    <p class="section_title">Bank Account Management</p>
    <p class="add_new" @click="$emit('addBank')">
      Add new bank account
      <span v-if="deleteLoading" class="delete_loader"
        ><BtnLoader color="#7a62eb" size="20"
      /></span>
    </p>
    <div v-if="!loading" class="management_content">
      <div v-if="bankAccounts.length">
        <div
          v-for="(bank, index) in bankAccounts"
          :key="index"
          class="bank_ctn"
        >
          <div class="bank_box">
            <div class="box_lhs">
              <!-- <div class="bank_logo">
              <img src="~assets/images/stanbic_logo.png" alt="" />
            </div> -->
              <div>
                <p class="bank_name">
                  {{ bank.bank_name }}
                  <span class="material-icons-outlined info"> info </span>
                </p>
                <p class="bank_acct_num_title">Account Number</p>
                <p class="bank_acct_num">
                  {{ functions.maskNumber(bank.account_number) }}
                </p>
              </div>
            </div>
            <div class="box_rhs">
              <p v-if="bank.is_default" class="bank_default">Default</p>
              <p v-else class="set_bank_default" @click="setDefault(bank.id)">Set as Default</p>
            </div>
          </div>
          <div
            v-if="!bank.is_default"
            class="delete_btn"
            @click="deleteBank(bank.id)"
          >
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
      <TableEmpty v-else />
    </div>
    <div v-else class="account_loader">
      <LoaderBankAccounts />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const toast = useToast();
const loading = ref(false);
const deleteLoading = ref(false);
const bankAccounts = ref([]);

const getBankAccounts = () => {
  loading.value = true;
  axios
    .get("bank-account/list")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      bankAccounts.value = onfulfilled.data.data.bank_accounts;
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const deleteBank = (id) => {
  console.log(id);
  deleteLoading.value = true;
  axios
    .delete(`bank-account/delete/${id}`)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      toast.add({ title: "Bank Account Deleted", color: "green" });
      getBankAccounts();
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
    .get(`bank-account/set-default/${id}`)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      toast.add({ title: "Bank Account set as default", color: "green" });
      getBankAccounts();
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      deleteLoading.value = false;
    });
};

getBankAccounts();
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
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 30rem;
}

.box_lhs {
  display: flex;
}

.bank_logo {
  margin-right: 20px;
  padding-top: 10px;
}

.bank_logo img {
  width: 80%;
}

.bank_name {
  color: #6a707e;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
}

.info {
  font-size: 16px;
  margin-left: 10px;
}

.bank_acct_num_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
}

.bank_acct_num {
  color: #021c3e6b;
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
