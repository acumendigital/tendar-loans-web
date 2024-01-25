<template>
  <div class="section_ctn">
    <p class="section_title">Personal Details</p>
    <div class="profile_top_section">
      <div class="profile_image_ctn">
        <div class="profile_image">
          <img src="~assets/images/Ellipse 45.png" alt="" />
        </div>
        <p class="edit_image">Edit profile image</p>
      </div>
      <button class="edit_profile" @click="$emit('editProfile')">Edit Profile</button>
    </div>
    <div class="contents">
      <div class="content">
        <p class="content_title">Name</p>
        <p class="content_value">{{ dataStore.userProfile?.first_name || '--' }} {{ dataStore.userProfile?.last_name || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">Date of Birth</p>
        <p class="content_value">{{ dataStore.userProfile?.date_of_birth || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">Email</p>
        <p class="content_value">{{ dataStore.userProfile.user?.email || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">State</p>
        <p class="content_value">{{ dataStore.userProfile?.address.state || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">Phone Number</p>
        <p class="content_value">{{ dataStore.userProfile.user?.phone || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">Employment status</p>
        <p class="content_value">{{ dataStore.userProfile?.employment_status || '--' }}</p>
      </div>
      <div class="content">
        <p class="content_title">Employer’s name</p>
        <p class="content_value">Acumen Digital</p>
      </div>
      <div class="content">
        <p class="content_title">Home Address</p>
        <p class="content_value">{{ dataStore.userProfile?.address.address || '--' }}, {{ functions.capitalizeFirstLetter(dataStore.userProfile?.address.city) || '--' }} {{ functions.capitalizeFirstLetter(dataStore.userProfile?.address.state) || '--' }} {{ functions.capitalizeFirstLetter(dataStore.userProfile?.address.country) || '--' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const dataStore = useUserStore();

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
  display: flex;
  align-items: center;
  margin-bottom: 20px;
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
