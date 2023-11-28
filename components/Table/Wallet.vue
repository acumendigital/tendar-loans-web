<template>
  <TableLoader
    v-if="loading"
    title="Customers"
    :top-rhs-btn="true"
    :tab-headers-loader="tabHeadersLoader"
    :tab-headers-loader-length="3"
    sub-title="View all user activities and transactions in one place."
  />
  <TableContainer v-else>
    <template #table>
      <div class="table-main-heading">
        <div class="search-filter-row">
          <TableSearch />
          <!--<div class="filters">
            <FilterCustomersTable
              @filter-data="filterData"
              @clear-filter="clearFilter"
            />
          </div> -->
        </div>
        <TabHeaders
          v-if="true"
          :tabs="['All Transactions', 'Wallet Top-up', 'Withdrawals']"
          :active-tab="activeTab"
          @set-active-tab="setActiveTab"
        />
        <!-- <div v-if="filterDisplayActive" class="filters-display">
          <div class="lhs">
            <span
              ><b>{{ customersData.totalDocs }}</b> results</span
            >
            <span>
              for <b>{{ activeTab.toLowerCase() }}</b>
              {{ activeTab.toLowerCase() === 'all' ? 'customers' : '' }}</span
            >
            <span>
              {{ filterLoanStatus ? ' with' : '' }}
            <b>{{ filterLoanStatus ? `${filterLoanStatus.toLowerCase()} loans` : '' }}</b>
              </span
            >
            <span v-if="search"
              >matching <b>{{ search }}</b></span
            >
            <span v-if="filterFromDate"
              >from <b>{{ detailedDate(filterFromDate) }}</b></span
            >
            <span v-if="filterToDate"
              >to <b>{{ detailedDate(filterToDate) }}</b></span
            >
          </div>
          <div class="rhs">
            <button
              v-if="filterFromDate || filterToDate || filterLoanStatus"
              class="default-input"
              @click="clearFilter"
            >
              <span class="cancel-btn material-icons-round"> close </span>
              Clear filter
            </button>
          </div>
        </div> -->
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr class="table-header">
              <td class="td-4">
                <div class="th-content">Reference</div>
              </td>
              <td class="td-4">
                <div class="th-content">Transaction Type</div>
              </td>
              <td class="td-4">
                <div class="th-content">Beneficiary Name</div>
              </td>
              <td class="td-3">
                <div class="th-content">Amount</div>
              </td>
              <td class="td-4">
                <div class="th-content">Date</div>
              </td>
              <td class="td-4">
                <div class="th-content">Transaction status</div>
              </td>
              <td class="td-1"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in tableData" :key="index" class="table-row" @click="$emit('openSidebar')">
              <td class="td-4">
                <div class="td-content">{{ data.reference }}</div>
              </td>
              <td class="td-4">
                <div class="td-content">{{ data.transaction_type }}</div>
              </td>
              <td class="td-4">
                <div class="td-content">{{ data.name }}</div>
              </td>
              <td class="td-3">
                <div class="td-content text-bold">
                  {{ formatMoney(data.amount, "NGN") }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">{{ data.date }}</div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  <Badge :type="data.transaction_status" />
                  <!-- <Badge type="failed" /> -->
                </div>
              </td>
              <td class="td-1">
                <div class="td-content">
                  <button>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M8 12.5781C8 13.1086 7.78929 13.6173 7.41421 13.9923C7.03914 14.3674 6.53043 14.5781 6 14.5781C5.46957 14.5781 4.96086 14.3674 4.58579 13.9923C4.21071 13.6173 4 13.1086 4 12.5781C4 12.0477 4.21071 11.539 4.58579 11.1639C4.96086 10.7888 5.46957 10.5781 6 10.5781C6.53043 10.5781 7.03914 10.7888 7.41421 11.1639C7.78929 11.539 8 12.0477 8 12.5781ZM14 12.5781C14 13.1086 13.7893 13.6173 13.4142 13.9923C13.0391 14.3674 12.5304 14.5781 12 14.5781C11.4696 14.5781 10.9609 14.3674 10.5858 13.9923C10.2107 13.6173 10 13.1086 10 12.5781C10 12.0477 10.2107 11.539 10.5858 11.1639C10.9609 10.7888 11.4696 10.5781 12 10.5781C12.5304 10.5781 13.0391 10.7888 13.4142 11.1639C13.7893 11.539 14 12.0477 14 12.5781ZM18 14.5781C18.5304 14.5781 19.0391 14.3674 19.4142 13.9923C19.7893 13.6173 20 13.1086 20 12.5781C20 12.0477 19.7893 11.539 19.4142 11.1639C19.0391 10.7888 18.5304 10.5781 18 10.5781C17.4696 10.5781 16.9609 10.7888 16.5858 11.1639C16.2107 11.539 16 12.0477 16 12.5781C16 13.1086 16.2107 13.6173 16.5858 13.9923C16.9609 14.3674 17.4696 14.5781 18 14.5781Z"
                        fill="#5B6871"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- <TableEmpty v-else>
          <template #tableHeader>
            <tr class="table-header">
              <td class="td-3">
                <div class="th-content">Full Name</div>
              </td>
              <td class="td-4">
                <div class="th-content">Email</div>
              </td>
              <td class="td-3">
                <div class="th-content">Phone Number</div>
              </td>
              <td class="td-4">
                <div class="th-content">Date Registered</div>
              </td>
              <td class="td-3">
                <div class="th-content">Loan Status</div>
              </td>
              <td class="td-3">
                <div class="th-content">Customer Status</div>
              </td>
            </tr>
          </template>
        </TableEmpty> -->
      </div>
      <TableFooter
        :data-items="dataItems"
        :limit="limit"
        :current-page="currentPage"
        :next-page="customersData.nextPage"
        :prev-page="customersData.prevPage"
        :total-data="totalData"
        :total-pages="totalPages"
        @set-limit="setLimit($event)"
        @set-page="setPage($event)"
        @next="next()"
        @prev="prev()"
      />
    </template>
  </TableContainer>
  <!-- </div> -->
</template>

<script>
import { detailedDate } from "@/utils/date-formats.js";
import functions from "@/utils/functions.js";
// const controller = new AbortController();
export default {
  name: "CustomersTable",
  props: {
    showTabs: {
      type: Boolean,
      default: () => true,
    },
    tabHeadersLoader: {
      type: Boolean,
      default: () => true,
    },
    tableData: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      customersData: {},
      activeTab: this.$route.query?.type || "All Transactions",
      limit:
        (this.$route.query?.perPage > 30
          ? 30
          : this.$route.query?.perPage < 5
            ? 5
            : this.$route.query?.perPage) || 10,
      filterFromDate: this.$route.query.from || "",
      filterToDate: this.$route.query.to || "",
      filterLoanStatus: this.$route.query.loanStatus || "",
      search: this.$route.query.q || "",
      currentPage: this.$route.query.page || 1,
      loading: false,
      detailedDate,
      formatPhone: functions.formatPhoneNumber,
      truncateString: functions.truncateString,
      formatMoney: functions.formatMoney,
      allChecked: false,
      totalPages: 10,
      totalData: 57,
    };
  },
  computed: {
    filterDisplayActive() {
      if (
        this.filterFromDate ||
        this.filterToDate ||
        this.search.length ||
        this.filterLoanStatus
      ) {
        return true;
      }
      return false;
    },
    computedCompanies() {
      if (this.activeTab.toLowerCase() === "inactive customers") {
        return this.dataItems.filter((c) => c.loanStatus === "Inactive");
      } else if (this.activeTab.toLowerCase() === "active customers") {
        return this.dataItems.filter((c) => c.loanStatus === "Active");
      } else if (this.activeTab.toLowerCase() === "owing") {
        return this.dataItems.filter((c) => c.loanStatus === "Owing");
      }
      return this.dataItems;
    },
    dataItems: {
      get() {
        return this.customersData?.docs?.map((c) => {
          c.checked = false;
          return c;
        });
      },
      set(dataItems) {
        return dataItems;
      },
    },
  },
  created() {
    // this.getCustomers(
    //   true,
    //   this.activeTab,
    //   this.limit,
    //   this.currentPage,
    //   this.filterFromDate,
    //   this.filterToDate,
    //   this.search,
    //   this.filterLoanStatus
    // )
  },
  methods: {
    getCustomers(
      loading = true,
      tab = "",
      limit,
      currentPage,
      fromDate,
      toDate,
      search,
      loanStatus
    ) {
      switch (tab.toLowerCase()) {
        case "all":
          tab = "";
          break;
        case "active customers":
          tab = true;
          break;
        case "inactive customers":
          tab = false;
          break;
        default:
          tab = "";
      }
      this.loading = loading;
      this.$axios({
        url: "/companyAdmin/user/all",
        params: {
          count: limit,
          start_date: fromDate,
          end_date: toDate,
          page: currentPage,
          search,
          active: tab,
          loan_status: loanStatus,
        },
      })
        .then((success) => {
          this.activeTab =
            tab === true
              ? "Active Customers"
              : tab === false
                ? "Inactive Customers"
                : "All";
          this.customersData = success.data.data;
          this.totalPages = this.customersData.totalPages;
          this.totalData = this.customersData.totalDocs;
          this.currentPage = this.customersData.page;
          this.filterFromDate = fromDate;
          this.filterToDate = toDate;
          this.search = search;
          this.filterLoanStatus = loanStatus;
          this.limit = Number(limit);
          const query = {
            // ...this.$route.query,
            from: this.filterFromDate,
            to: this.filterToDate,
            q: this.search,
            type: this.activeTab.toLowerCase(),
            page: this.currentPage,
            perPage: this.limit,
            loanStatus: this.filterLoanStatus,
          };
          for (const k of Object.keys(query)) {
            if (!query[k]) {
              delete query[k];
            }
          }
          this.$router
            .replace({
              query,
            })
            .catch(() => {});
        })
        .catch((_err) => {
          const errorMsg = _err?.response?.data?.message || _err?.message;
          this.$toaster.showToast({
            content:
              errorMsg || "Oops, something went wrong, please try again later",
            state: "error",
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    prev() {
      if (this.currentPage > 1) {
        this.setPage(this.currentPage - 1);
      }
    },
    next() {
      if (this.currentPage < this.totalPages) {
        this.setPage(this.currentPage + 1);
      }
    },
    navigate(item) {
      // this.$store.commit('setCustomerData', item)
      this.$router.push(`/customers/${item._id}`);
    },
    checkAll() {
      this.allChecked = !this.allChecked;
      if (this.allChecked) {
        this.dataItems = this.dataItems.map((c) => {
          c.checked = true;
          return c;
        });
      } else {
        this.dataItems = this.dataItems.map((c) => {
          c.checked = false;
          return c;
        });
      }
      return this.dataItems;
    },
    filterData(val) {
      this.getCustomers(
        false,
        this.activeTab,
        this.limit,
        this.currentPage,
        val.fromDate,
        val.toDate,
        this.search,
        val.loanStatus
      );
    },
    clearFilter() {
      this.getCustomers(
        false,
        this.activeTab,
        this.limit,
        1,
        "",
        "",
        this.search,
        ""
      );
    },
    setActiveTab(val) {
      this.activeTab = val;
      // this.getCustomers(
      //   false,
      //   val,
      //   this.limit,
      //   1,
      //   this.filterFromDate,
      //   this.filterToDate,
      //   this.search,
      //   this.filterLoanStatus,
      // );
    },
    searchCustomer(search) {
      this.getCustomers(
        false,
        this.activeTab,
        this.limit,
        this.currentPage,
        this.filterFromDate,
        this.filterToDate,
        search,
        this.filterLoanStatus
      );
    },
    setLimit(limit) {
      this.getCustomers(
        false,
        this.activeTab,
        limit,
        1,
        this.filterFromDate,
        this.filterToDate,
        this.search,
        this.filterLoanStatus
      );
    },
    setPage(page) {
      this.getCustomers(
        false,
        this.activeTab,
        this.limit,
        page,
        this.filterFromDate,
        this.filterToDate,
        this.search,
        this.filterLoanStatus
      );
    },
  },
};
</script>

<style scoped>
.search-filter-row {
  margin-bottom: 30px;
}
</style>
