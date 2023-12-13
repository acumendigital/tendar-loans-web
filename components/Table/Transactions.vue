<template>
  <TableLoader
    v-if="loading"
    :top-rhs-btn="false"
    :tab-headers-loader="tabHeadersLoader"
    :tab-headers-loader-length="3"
  />
  <TableContainer v-else>
    <template #table>
      <div class="table-main-heading">
        <!-- <div class="top flex">
          <div class="lhs">
            <div class="title">Transactions</div>
            <div class="sub-title">
              View all user activities and transactions in one place.
            </div>
          </div>
          <div class="rhs"></div>
        </div> -->
        <div class="search_filter">
          <div class="search-filter-row">
            <TableSearch @search="searchTransaction($event)" />
            <div class="filters">
              <FilterTransactionsTable
                @filter-data="filterData"
                @clear-filter="clearFilter"
              />
            </div>
          </div>
          <div v-if="filterDisplayActive" class="filters-display">
            <div class="lhs">
              <span
                ><b>{{ transactionData.totalDocs }}</b> results</span
              >
              <span>
                for <b>{{ activeTab.toLowerCase() }}</b>
                {{ activeTab.toLowerCase() === "all" ? "customers" : "" }}</span
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
                v-if="filterFromDate || filterToDate"
                class="default-input"
                @click="clearFilter"
              >
                <span class="cancel-btn material-icons-round"> close </span>
                Clear filter
              </button>
            </div>
          </div>
        </div>
        <TabHeaders
          v-if="true"
          :tabs="['All Transactions', 'Top-up', 'Withdrawals']"
          :active-tab="activeTab"
          @set-active-tab="setActiveTab"
        />
      </div>
      <div class="table-wrapper">
        <table v-if="dataItems && dataItems.length">
          <thead>
            <tr class="table-header">
              <td class="td-4">
                <div class="th-content">Reference</div>
              </td>
              <td class="td-4">
                <div class="th-content">Transaction Type</div>
              </td>
              <td class="td-4">
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
            <tr
              v-for="(data, index) in tableData"
              :key="index"
              class="table-row"
            >
              <td class="td-4">
                <div class="td-content">{{ data.reference }}</div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  {{ capitalizeFirstLetter(data.type) }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content text-bold">
                  {{ formatMoney(data.amount, "NGN") }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  {{ detailedDate(data.created_at) }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  <Badge :type="data.status" />
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
        <TableEmpty v-else>
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
                <div class="th-content">Transaction Status</div>
              </td>
            </tr>
          </template>
        </TableEmpty>
      </div>
      <TableFooter
        :data-items="dataItems"
        :limit="limit"
        :current-page="currentPage"
        :next-page="transactionData.nextPage"
        :prev-page="transactionData.prevPage"
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
  name: "TransactionsTable",
  props: {
    showTabs: {
      type: Boolean,
      default: () => true,
    },
    tabHeadersLoader: {
      type: Boolean,
      default: () => true,
    },
    // tableData: {
    //   type: Array,
    //   default: () => []
    // },
  },
  data() {
    return {
      transactionData: {},
      tableData: [],
      activeTab: this.$route.query?.type || "All Transactions",
      limit:
        (this.$route.query?.perPage > 30
          ? 30
          : this.$route.query?.perPage < 5
            ? 5
            : this.$route.query?.perPage) || 10,
      filterFromDate: this.$route.query.from || "",
      filterToDate: this.$route.query.to || "",
      search: this.$route.query.q || "",
      currentPage: this.$route.query.page || 1,
      loading: false,
      detailedDate,
      formatPhone: functions.formatPhoneNumber,
      truncateString: functions.truncateString,
      formatMoney: functions.formatMoney,
      capitalizeFirstLetter: functions.capitalizeFirstLetter,
      allChecked: false,
      totalPages: 10,
      totalData: 57,
    };
  },
  computed: {
    filterDisplayActive() {
      if (this.filterFromDate || this.filterToDate || this.search.length) {
        return true;
      }
      return false;
    },
    // computedCompanies() {
    //   if (this.activeTab.toLowerCase() === "inactive customers") {
    //     return this.dataItems.filter((c) => c.loanStatus === "Inactive");
    //   } else if (this.activeTab.toLowerCase() === "active customers") {
    //     return this.dataItems.filter((c) => c.loanStatus === "Active");
    //   } else if (this.activeTab.toLowerCase() === "owing") {
    //     return this.dataItems.filter((c) => c.loanStatus === "Owing");
    //   }
    //   return this.dataItems;
    // },
    dataItems: {
      get() {
        return this.tableData?.map((c) => {
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
    this.getTransactions(
      true,
      this.activeTab,
      this.limit,
      this.currentPage,
      this.filterFromDate,
      this.filterToDate,
      this.search
    );
  },
  methods: {
    getTransactions(
      loading = true,
      tab = "",
      limit,
      currentPage,
      fromDate,
      toDate,
      search
    ) {
      // switch (tab.toLowerCase()) {
      //   case "all":
      //     tab = "";
      //     break;
      //   case "active customers":
      //     tab = true;
      //     break;
      //   case "inactive customers":
      //     tab = false;
      //     break;
      //   default:
      //     tab = "";
      // }

      const toast = useToast();
      // console.log(search);
      this.loading = loading;
      this.$axios({
        url: "dashboard/transaction/list",
        params: {
          limit: limit,
          // start_date: fromDate,
          // end_date: toDate,
          page: currentPage,
          search,
          active: tab,
          currency: '',
          status: '',
          reference: '',
          type: ''
        },
      })
        .then((success) => {
          // this.activeTab =
          //   tab === true
          //     ? "Active Transactions"
          //     : tab === false
          //       ? "Inactive Transactions"
          //       : "All";
          this.transactionData = success.data.data.transactions;
          this.tableData = this.transactionData.data;
          console.log(this.tableData);
          this.totalPages = this.transactionData.totalPages;
          this.totalData = this.transactionData.totalDocs;
          this.currentPage = this.transactionData.page;
          this.filterFromDate = fromDate;
          this.filterToDate = toDate;
          this.search = search;
          this.limit = Number(limit);
          const query = {
            // ...this.$route.query,
            from: this.filterFromDate,
            to: this.filterToDate,
            q: this.search,
            type: this.activeTab.toLowerCase(),
            page: this.currentPage,
            perPage: this.limit,
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
          toast.add({ title: errorMsg, color: "red" });
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
      // this.$store.commit('setTransactionData', item)
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
      this.getTransactions(
        false,
        this.activeTab,
        this.limit,
        this.currentPage,
        val.fromDate,
        val.toDate,
        this.search
      );
    },
    clearFilter() {
      this.getTransactions(
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
      // this.getTransactions(
      //   false,
      //   val,
      //   this.limit,
      //   1,
      //   this.filterFromDate,
      //   this.filterToDate,
      //   this.search,
      // );
    },
    searchTransaction(search) {
      this.getTransactions(
        false,
        this.activeTab,
        this.limit,
        this.currentPage,
        this.filterFromDate,
        this.filterToDate,
        search
      );
    },
    setLimit(limit) {
      this.getTransactions(
        false,
        this.activeTab,
        limit,
        1,
        this.filterFromDate,
        this.filterToDate,
        this.search
      );
    },
    setPage(page) {
      this.getTransactions(
        false,
        this.activeTab,
        this.limit,
        page,
        this.filterFromDate,
        this.filterToDate,
        this.search
      );
    },
  },
};
</script>

<style scoped>
.search_filter {
  margin-bottom: 30px;
}
.search-filter-row {
  margin-top: 0 !important;
}
</style>
