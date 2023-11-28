<!-- Sidebar.vue -->
<template>
  <div class="ctn">
    <!-- Overlay background -->
    <div v-if="isOpen" @click="closeSidebar" class="overlay"></div>

    <div :class="{ 'sidebar-open': isOpen }" class="sidebar">
      <!-- Your sidebar content goes here -->
      <div class="sidebar-content">
        <div class="back_btn">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.79688 22.6797H15.7969C20.7969 22.6797 22.7969 20.6797 22.7969 15.6797V9.67969C22.7969 4.67969 20.7969 2.67969 15.7969 2.67969H9.79688C4.79688 2.67969 2.79688 4.67969 2.79688 9.67969V15.6797C2.79688 20.6797 4.79688 22.6797 9.79688 22.6797Z"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14.0591 16.2084L10.5391 12.6784L14.0591 9.14844"
              stroke="#292D32"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>Back</p>
        </div>
        <div class="main_content">
          <div class="title">Loan Details</div>
          <div class="content">
            <p class="content_title main_title">Loan ID</p>
            <p class="content_value">BN-B1E73DA–0017</p>
          </div>
          <p class="other_details_head">Other details</p>
          <div class="contents">
            <div class="content">
              <p class="content_title">Amount borrowed</p>
              <p class="content_value text-bold">₦300,000</p>
            </div>
            <div class="content">
              <p class="content_title">Date disbursed</p>
              <p class="content_value">Dec 30, 2022</p>
            </div>
            <div class="content">
              <p class="content_title">Interest rate</p>
              <p class="content_value">5%</p>
            </div>
            <div class="content">
              <p class="content_title">Loan Status</p>
              <Badge :type="'Ongoing'" />
            </div>
          </div>
          <div class="table_section" v-if="$route.name === 'loans'">
            <TableRepaymentHistory :tableData="tableData" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpenProp: Boolean, // Prop to receive the open state from the parent
  },
  data() {
    return {
      isOpen: this.isOpenProp || false,
      tableData: [
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
        {
          id: "INV-024",
          amount_paid: "97900",
          date: "20 April, 2023",
          status: "Paid",
        },
      ],
    };
  },
  watch: {
    isOpenProp(newVal) {
      // Update the local isOpen state when the prop changes
      this.isOpen = newVal;
    },
  },
  methods: {
    closeSidebar() {
      this.isOpen = false;
      this.$emit("update:isOpenProp", false); // Emit an event to update the prop in the parent
    },
  },
};
</script>

<style scoped>
.ctn {
  z-index: 1000;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #012a5620; /* Semi-transparent overlay */
  z-index: 99; /* Ensure it appears above the sidebar */
}

.sidebar {
  position: fixed;
  top: 0;
  right: -700px; /* Start off-screen */
  height: 100%;
  width: 700px;
  background-color: #fff;
  transition: right 0.4s ease;
  z-index: 100; /* Ensure it appears above the overlay */
}

.sidebar-open {
  right: 0;
}

.sidebar-content {
  padding: 100px 50px;
  color: white;
}

.back_btn {
  display: flex;
  margin-bottom: 30px;
}

.back_btn svg {
  margin-right: 10px;
}

.back_btn p {
  color: #021c3e80;
  font-size: 16px;
  font-weight: 500;
}

.main_content {
  height: 100%;
  width: 700px;
  position: fixed;
  overflow: auto;

}

.title {
  font-weight: 700;
  margin-bottom: 20px;
}

.contents {
  display: flex;
  flex-wrap: wrap;
}

.content {
  flex-basis: 40%;
  margin-bottom: 20px;
}

.content_title {
  color: #464a53;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 10px;
}

.content_value {
  color: #6a707e;
  font-size: 16px;
  font-weight: 500;
}

.text-bold {
  font-weight: 700;
  font-size: 19px;
  color: #10253e;
}

.main_title {
  color: #021c3e;
  font-size: 20px;
  font-weight: 500;
}

.other_details_head {
  color: #021c3e;
  font-size: 20px;
  font-weight: 500;
  margin: 30px 0;
}

.table_section {
  padding-bottom: 40px;
}
</style>