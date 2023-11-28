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
        <p>Repayment history</p>
      </div>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr class="table-header">
              <td class="td-4">
                <div class="th-content">Transaction ID</div>
              </td>
              <td class="td-4">
                <div class="th-content">Amount Paid</div>
              </td>
              <td class="td-4">
                <div class="th-content">Date</div>
              </td>
              <td class="td-3">
                <div class="th-content">Status</div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(data, index) in tableData" :key="index" class="table-row">
              <td class="td-4">
                <div class="td-content">{{ data.id }}</div>
              </td>
              <td class="td-4">
                <div class="td-content text-bold">
                  {{ formatMoney(data.amount_paid, "NGN") }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">{{ data.date }}</div>
              </td>
              <td class="td-3">
                <div class="td-content">
                  <Badge :type="data.status" />
                  <!-- <Badge type="failed" /> -->
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
