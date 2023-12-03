<template>
  <div class="section_ctn">
    <p class="section_title">Personal Details</p>
    <div class="profile_image_ctn">
      <div class="profile_image">
        <img src="~assets/images/Ellipse 45.png" alt="" />
      </div>
      <p class="edit_image">Edit profile image</p>
    </div>
    <div class="contents">
      <div class="content">
        <p class="content_title">Name</p>
        <p class="content_value">Lanre Anderson</p>
      </div>
      <div class="content">
        <p class="content_title">Date of Birth</p>
        <p class="content_value">14th May, 2000</p>
      </div>
      <div class="content">
        <p class="content_title">Email</p>
        <p class="content_value">courtneyhenry@email.com</p>
      </div>
      <div class="content">
        <p class="content_title">State</p>
        <p class="content_value">Lagos</p>
      </div>
      <div class="content">
        <p class="content_title">Phone Number</p>
        <p class="content_value">+2348123456789</p>
      </div>
      <div class="content">
        <p class="content_title">Employment status</p>
        <p class="content_value">Employed</p>
      </div>
      <div class="content">
        <p class="content_title">Employer’s name</p>
        <p class="content_value">Acumen Digital</p>
      </div>
      <div class="content">
        <p class="content_title">Home Address</p>
        <p class="content_value">45, Charles Martins Avenue, Lagos, Nigeria</p>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.section_ctn {
  padding: 0 30px;
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
  color: #021C3E;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 7px;
}

.content_value {
  color: #6a707e;
  font-size: 16px;
  font-weight: 500;
}
</style>
