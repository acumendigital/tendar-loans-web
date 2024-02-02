<!-- Sidebar.vue -->
<template>
  <div class="ctn">
    <!-- Overlay background -->
    <div v-if="isOpen" @click="closeSidebar" class="overlay"></div>

    <div :class="{ 'sidebar-open': isOpen }" class="sidebar">
      <!-- Your sidebar content goes here -->
      <div class="sidebar_main_ctn">
        <div class="sidebar-content">
          <div class="back_btn" @click="closeSidebar">
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
          <div v-if="loading">
            <LoaderSideDetails />
          </div>
          <div v-else class="main_content">
            <div v-if="$route.name === 'loans'">
              <div class="title">Loan Details</div>
              <!-- <div class="content">
                <p class="content_title main_title">Loan ID</p>
                <p class="content_value">{{ detailsData.id }}</p>
              </div> -->
              <!-- <p class="other_details_head">Other details</p> -->
              <div class="contents">
                <div class="content">
                  <p class="content_title">Amount borrowed</p>
                  <p class="content_value text-bold">
                    {{
                      formatMoney(
                        detailsData.amount_given,
                        detailsData.currency || "NGN"
                      )
                    }}
                  </p>
                </div>
                <div class="content">
                  <p class="content_title">Date disbursed</p>
                  <p class="content_value">
                    {{ detailedDate(detailsData.date_accepted) }}
                  </p>
                </div>
                <div class="content">
                  <p class="content_title">Interest rate</p>
                  <p class="content_value">%{{ detailsData.interest_rate }}</p>
                </div>
                <div class="content">
                  <p class="content_title">Loan Status</p>
                  <Badge :type="detailsData.status" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="title">Transaction Details</div>
              <!-- <div class="content">
                <p class="content_title main_title">Transaction ID</p>
                <p class="content_value">{{ detailsData.id }}</p>
              </div> -->
              <!-- <p class="other_details_head">Other details</p> -->
              <div class="contents">
                <div class="content">
                  <p class="content_title">Amount</p>
                  <p class="content_value text-bold">
                    {{
                      formatMoney(
                        detailsData.amount,
                        detailsData.currency || "NGN"
                      )
                    }}
                  </p>
                </div>
                <div class="content">
                  <p class="content_title">Date</p>
                  <p class="content_value">
                    {{ detailedDate(detailsData.created_at) }}
                  </p>
                </div>
                <div class="content">
                  <p class="content_title">Transaction Type</p>
                  <p class="content_value">
                    {{
                      detailsData.type
                        ? capitalizeFirstLetter(detailsData.type)
                        : "--"
                    }}
                  </p>
                </div>
                <div v-if="detailsData.beneficiary" class="content">
                  <p class="content_title">Beneficiary name</p>
                  <p class="content_value">
                    {{
                      detailsData.beneficiary
                        ? capitalizeFirstLetter(detailsData.beneficiary)
                        : "--"
                    }}
                  </p>
                </div>
                <div class="content">
                  <p class="content_title">Loan Status</p>
                  <Badge :type="detailsData.status" />
                </div>
              </div>
            </div>
            <div class="table_section" v-if="$route.name === 'loans'">
              <TableRepaymentHistory
                :tableData="repayments"
                :loading="loading"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { detailedDate } from "@/utils/date-formats.js";
import functions from "@/utils/functions";
import axios from "axios";
export default {
  props: {
    isOpenProp: Boolean, // Prop to receive the open state from the parent
    transactionId: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      detailedDate,
      formatMoney: functions.formatMoney,
      capitalizeFirstLetter: functions.capitalizeFirstLetter,
      isOpen: this.isOpenProp || false,
      detailsData: {},
      repayments: [],
      loading: false,
    };
  },
  watch: {
    isOpenProp(newVal) {
      // Update the local isOpen state when the prop changes
      this.isOpen = newVal;
      const route = useRoute();
      if (this.isOpen) {
        if (route.name === "loans") {
          this.getLoanData();
        } else {
          this.getTransactionData();
        }
      }
    },
  },
  // created() {
  // },
  methods: {
    closeSidebar() {
      this.isOpen = false;
      this.$emit("update:isOpenProp", false); // Emit an event to update the prop in the parent
    },
    getTransactionData() {
      this.loading = true;
      const toast = useToast();
      console.log(this.transactionId);
      axios
        .get(`wallet/transaction/fetch/${this.transactionId}`)
        .then((onfulfilled) => {
          console.log(onfulfilled);
          this.detailsData = onfulfilled.data.data.transaction;
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.message || err.message;
          toast.add({ title: errorMsg, color: "red" });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getLoanData() {
      this.loading = true;
      const toast = useToast();
      console.log("loan", this.transactionId);
      axios
        .get(`loan/fetch/${this.transactionId}`)
        .then((onfulfilled) => {
          console.log(onfulfilled);
          this.detailsData = onfulfilled.data.data.loan;
          this.repayments = onfulfilled.data.data.loan.repayments;
        })
        .catch((err) => {
          const errorMsg = err.response?.data?.message || err.message;
          toast.add({ title: errorMsg, color: "red" });
        })
        .finally(() => {
          this.loading = false;
        });
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

.sidebar_main_ctn {
  max-height: 100%;
  overflow: auto;
}

.sidebar-content {
  padding: 30px 10px 30px 50px;
  height: 100%;
  color: white;
}

.back_btn {
  display: flex;
  margin-bottom: 30px;
  cursor: pointer;
}

.back_btn svg {
  margin-right: 10px;
}

.back_btn p {
  color: #021c3e80;
  font-size: 16px;
  font-weight: 500;
}

/* .main_content {
  max-height: 100%;
  overflow: auto;
} */

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
