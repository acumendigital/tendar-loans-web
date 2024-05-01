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
            <TableSearch
              :searchName="'Reference'"
              :loading="searchLoading"
              @search="searchTransaction($event)"
            />
            <div class="filters">
              <FilterLoansTable
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
        <TabHeaders v-if="true" :tabs="['Loan history']" />
      </div>
      <div class="table-wrapper">
        <table v-if="dataItems && dataItems.length">
          <thead>
            <tr class="table-header">
              <td class="td-4">
                <div class="th-content">Reference</div>
              </td>
              <td class="td-4">
                <div class="th-content">Amount borrowed</div>
              </td>
              <td class="td-4">
                <div class="th-content">Amount repaid</div>
              </td>
              <td class="td-3">
                <div class="th-content">Date disbursed</div>
              </td>
              <td class="td-4">
                <div class="th-content">Next repayment date</div>
              </td>
              <td class="td-4">
                <div class="th-content">Loan status</div>
              </td>
              <!-- <td class="td-1"></td> -->
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(data, index) in dataItems"
              :key="index"
              class="table-row"
              @click="$emit('openSidebar', data.id)"
            >
              <td class="td-4">
                <div class="td-content">{{ data.reference }}</div>
              </td>
              <td class="td-4">
                <div class="td-content text-bold">
                  {{ formatMoney(data.amount_given, "NGN") }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content text-bold">
                  {{ formatMoney(data.amount_paid, "NGN") }}
                </div>
              </td>
              <td class="td-3">
                <div class="td-content">
                  {{ detailedDate(data.date_accepted) }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  {{ detailedDate(data.next_pay_date) }}
                </div>
              </td>
              <td class="td-4">
                <div class="td-content">
                  <Badge :type="data.status" />
                  <!-- <Badge type="failed" /> -->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <TableEmpty v-else>
          <template #tableHeader>
            <tr class="table-header">
              <td class="td-4">
                <div class="th-content">Reference</div>
              </td>
              <td class="td-4">
                <div class="th-content">Amount borrowed</div>
              </td>
              <td class="td-4">
                <div class="th-content">Amount repaid</div>
              </td>
              <td class="td-3">
                <div class="th-content">Date disbursed</div>
              </td>
              <td class="td-4">
                <div class="th-content">Next repayment date</div>
              </td>
              <td class="td-4">
                <div class="th-content">Loan status</div>
              </td>
              <!-- <td class="td-1"></td> -->
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
      type: "",
      status: "",
      search: this.$route.query.q || "",
      currentPage: this.$route.query.page || 1,
      loading: false,
      searchLoading: false,
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
      false,
      this.activeTab,
      this.limit,
      this.currentPage,
      this.filterFromDate,
      this.filterToDate,
      this.status,
      this.search
    );
  },
  methods: {
    getTransactions(
      loading = true,
      searchLoading = false,
      tab = "",
      limit,
      currentPage,
      fromDate,
      toDate,
      status,
      search
    ) {

      const toast = useToast();
      this.loading = loading;
      this.searchLoading = searchLoading;
      this.$axios({
        url: "loan/list",
        params: {
          limit: limit,
          // start_date: fromDate,
          // end_date: toDate,
          page: currentPage,
          search,
          active: tab,
          currency: "",
          status: status,
        },
      })
        .then((success) => {
          this.transactionData = success.data.data.loans;
          this.tableData = this.transactionData.data;
          this.totalPages = this.transactionData.total_pages;
          this.totalData = this.transactionData.total;
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
          this.searchLoading = false;
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
        true,
        this.activeTab,
        this.limit,
        this.currentPage,
        val.fromDate,
        val.toDate,
        val.status,
        this.search
      );
    },
    clearFilter() {
      this.getTransactions(
        false,
        false,
        this.activeTab,
        this.limit,
        1,
        "",
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
        true,
        this.activeTab,
        this.limit,
        this.currentPage,
        this.filterFromDate,
        this.filterToDate,
        this.status,
        search
      );
    },
    setLimit(limit) {
      this.getTransactions(
        false,
        true,
        this.activeTab,
        limit,
        1,
        this.filterFromDate,
        this.filterToDate,
        this.status,
        this.search
      );
    },
    setPage(page) {
      this.getTransactions(
        false,
        true,
        this.activeTab,
        this.limit,
        page,
        this.filterFromDate,
        this.filterToDate,
        this.status,
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
