<template>
  <div class="section_ctn">
    <p class="section_title">Bank Account Management</p>
    <p class="add_new">Add new bank account</p>
    <div class="management_content">
      <div class="bank_ctn">
        <div class="bank_box">
          <div class="box_lhs">
            <div class="bank_logo">
              <img src="~assets/images/stanbic_logo.png" alt="" />
            </div>
            <div>
              <p class="bank_name">
                Stanbic IBTC <span class="material-icons-outlined"> info </span>
              </p>
              <p class="bank_acct_num_title">Account Number</p>
              <p class="bank_acct_num">*******67890</p>
            </div>
          </div>
          <div class="box_rhs">
            <p class="bank_default">Default</p>
          </div>
        </div>
        <div class="delete_btn">
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

.add_new {
  color: #7a62eb;
  cursor: pointer;
  font-weight: 700;
  text-transform: uppercase;
}

.bank_ctn {
  display: flex;
  align-items: center;
}

.bank_box {
  border: 1px solid #888f9b;
  border-radius: 20px;
  padding: 20px 20px;
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
}

.bank_name {
  color: #6a707e;
  font-size: 18px;
  font-weight: 700;
}

.bank_acct_num_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
}

.delete_btn {
  margin-left: 30px;
}
</style>
