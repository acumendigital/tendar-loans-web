<template>
  <div class="header_ctn border-slate-50 border-2">
    <div class="h-[90px] flex justify-between align-center max-w-[1600px]">
      <TendarLogo />
      <div>
        <div class="profile" @click="dropDownShow = !dropDownShow">
          <p class="username">
            {{ dataStore.userProfile?.first_name }}
            {{ dataStore.userProfile?.last_name }}
          </p>
          <!-- <img src="~assets/images/Ellipse-45.png" alt="" /> -->
          <img class="image_sec" v-if="image" :src="image" alt="" />
          <div v-else class="image_sec">
            <span class="material-icons-round"> account_circle </span>
          </div>
        </div>
        <div v-show="dropDownShow" class="action-filter-drop-down">
          <div class="action-item" @click="$router.push('/settings')">
            <DashboardHeaderIcon icon="profile" />
            Profile
          </div>
          <div class="action-item logout" @click="handleLogout">
            <DashboardHeaderIcon v-if="!loading" icon="logout" />
            <p v-if="!loading">Logout</p>
            <div v-else class="btn_loader">
              <BtnLoader color="var(--gray-light)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["open-modal"]);

import axios from "axios";
const dataStore = useUserStore();
const config = useRuntimeConfig();
const toast = useToast();
const dropDownShow = ref(false);
const loading = ref(false);
const image = ref(dataStore.userProfile?.image || "");

const handleLogout = () => {
  loading.value = true;
  axios
    .get("auth/logout")
    .then((onfulfilled) => {
      toast.add({ title: "Logged out!", color: "green" });
      const logoutResponse = onfulfilled.data.code;
      dataStore.resetStore();
      if (logoutResponse === 200) {
        navigateTo("/auth/login");
      }
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
};

const getUserProfile = () => {
  axios
    .get("customer/profile")
    .then((onfulfilled) => {
      const user_profile = onfulfilled.data.data.customer;
      dataStore.updateUserProfile(user_profile);
      image.value = user_profile?.image
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      // loading.value = false;
    });
};

getUserProfile()
</script>

<style scoped>
.header_ctn {
  position: fixed;
  width: 100%;
  z-index: 16;
  background-color: #fff;
}
.profile {
  display: flex;
  align-items: center;
  position: relative;
}

.profile img {
  margin-left: 15px;
}

.action-filter-drop-down {
  position: absolute;
  width: 150px;
  top: 90px;
  /* left: -60px; */
  right: 60px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  /* box-shadow: var(--container-shadow); */
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #dddfe180;
  background: #fff;
  transform-origin: top;
  animation: dropdown 0.4s ease-in-out;
  /* display: none; */
  z-index: 20;
}

/* .action-filter-drop-down:hover {
  display: flex;
}

.action-filter > .default-input:focus + .action-filter-drop-down {
  display: flex;
} */

.action-filter-drop-down > .action-item {
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 500;
  z-index: 20;
  transition: all 0.2s ease-out;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--gray-light);
}

.action-filter-drop-down > .action-item p {
  color: var(--gray-light);
  transition: all 0.2s ease-out;
  cursor: pointer;
  font-weight: 500;
}

.action-filter-drop-down > .action-item:hover {
  color: var(--primary-purple);
}

.action-filter-drop-down > .action-item:not(:last-child) {
  border-bottom: 1px solid #dddfe180;
}

.action-filter-drop-down > .action-item:first-child {
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.action-filter-drop-down > .action-item:last-child {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  /* color: var(--failure); */
  background: linear-gradient(to right, var(--failure) 50%, #fff 50%);
  background-size: 210% 100%;
  background-position: right bottom;
}

.action-filter-drop-down > .action-item:last-child:hover,
.action-filter-drop-down > .action-item:last-child:hover p {
  /* background: var(--failure); */
  color: #fff;
  background-position: left bottom;
}

.btn_loader {
  width: fit-content;
  margin: auto;
}

.image_sec {
  background-position: center;
  background-size: cover;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}

.material-icons-round {
  font-size: 60px;
}
</style>
