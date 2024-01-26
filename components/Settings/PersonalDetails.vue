<template>
  <div class="section_ctn">
    <p class="section_title">Personal Details</p>
    <div class="profile_top_section">
      <div class="profile_image_ctn">
        <div class="profile_image">
          <!-- <img class="image" src="~assets/images/Ellipse 45.png" alt="" /> -->
          <!-- <img class="image_sec" v-if="image" :src="image" alt="" /> -->
          <label
            v-if="!picLoading && !loading"
            for="change-picture"
            class="avatar-div"
          >
            <!-- <img class="image" v-if="image" :src="image" alt="" /> -->
            <div
              v-if="image"
              class="image_sec"
              :style="{ backgroundImage: `url(${image})` }"
            ></div>
            <div v-else class="image_sec">
              <span class="material-icons-round"> account_circle </span>
            </div>
          </label>
          <div v-else class="avatar-div">
            <div class="">
              <BtnLoader color="#7A62EB" />
            </div>
          </div>
        </div>
        <label for="change-picture">
          <span class="edit_image">Edit profile image</span>
          <input
            id="change-picture"
            type="file"
            accept="image/jpeg, image/png"
            @change="setImage"
          />
        </label>
      </div>
      <button class="edit_profile" @click="$emit('editProfile')">
        Edit Profile
      </button>
    </div>
    <div class="contents">
      <div class="content">
        <p class="content_title">Name</p>
        <p class="content_value">
          {{ dataStore.userProfile?.first_name || "--" }}
          {{ dataStore.userProfile?.last_name || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">Date of Birth</p>
        <p class="content_value">
          {{ dataStore.userProfile?.date_of_birth || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">Email</p>
        <p class="content_value">
          {{ dataStore.userProfile.user?.email || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">State</p>
        <p class="content_value">
          {{ dataStore.userProfile?.address.state || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">Phone Number</p>
        <p class="content_value">
          {{ dataStore.userProfile.user?.phone || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">Employment status</p>
        <p class="content_value">
          {{ dataStore.userProfile?.employment_status || "--" }}
        </p>
      </div>
      <div class="content">
        <p class="content_title">Employer’s name</p>
        <p class="content_value">Acumen Digital</p>
      </div>
      <div class="content">
        <p class="content_title">Home Address</p>
        <p class="content_value">
          {{ dataStore.userProfile?.address.address || "--" }},
          {{
            functions.capitalizeFirstLetter(
              dataStore.userProfile?.address.city
            ) || "--"
          }}
          {{
            functions.capitalizeFirstLetter(
              dataStore.userProfile?.address.state
            ) || "--"
          }}
          {{
            functions.capitalizeFirstLetter(
              dataStore.userProfile?.address.country
            ) || "--"
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const route = useRoute();
const toast = useToast();
const dataStore = useUserStore();
const picLoading = ref(false);
const loading = ref(false);
const image = ref(dataStore.userProfile?.image || "");

const setImage = (e) => {
  picLoading.value = true;
  const image = e.target.files[0];
  // console.log(image)
  const formData = new FormData();
  formData.append("image", image);
  axios
    .post("customer/image/upload", formData)
    .then((onfulfilled) => {
      console.log(onfulfilled);
      console.log(onfulfilled.data.data.image);
      image.value = onfulfilled.data.data.image;
      getUserProfile();
    })
    .catch((_err) => {
      const errorMsg = _err?.response?.data?.message || _err?.message;
      if (errorMsg) {
        toast.add({ title: errorMsg, color: "red" });
      } else {
        toast.add({
          title: "Oops, something went wrong, please try again later",
          color: "red",
        });
      }
    })
    .finally(() => {
      picLoading.value = false;
    });
};

const getUserProfile = () => {
  loading.value = true;
  axios
    .get("customer/profile")
    .then((onfulfilled) => {
      console.log(onfulfilled);
      const user_profile = onfulfilled.data.data.customer;
      dataStore.updateUserProfile(user_profile);
      toast.add({ title: "Profile picture updated", color: "green" });
      setTimeout(() => {
        window.location.reload()
      }, 1000);
    })
    .catch((err) => {
      const errorMsg = err.response?.data?.message || err.message;
      toast.add({ title: errorMsg, color: "red" });
    })
    .finally(() => {
      loading.value = false;
    });
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
.profile_image_ctn {
  flex-basis: 70%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.profile_image {
  flex-basis: 20%;
}

/* .avatar-div {
  width: 100%;
} */

.image_sec {
  background-position: center;
  background-size: cover;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
}

.material-icons-round {
  font-size: 60px;
}

.edit_image {
  color: var(--primary-purple);
  text-decoration: underline;
  font-weight: 500;
  margin-left: 10px;
  cursor: pointer;
}

.contents {
  display: flex;
  flex-wrap: wrap;
}

.content {
  flex-basis: 40%;
  margin-bottom: 25px;
}

.content_title {
  color: #021c3e;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
}

.content_value {
  color: #6a707e;
  font-size: 16px;
  font-weight: 500;
}

.profile_top_section {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.edit_profile {
  color: #252c32;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #dde2e4;
  background-color: #fff;
  padding: 10px 20px;
}
</style>
