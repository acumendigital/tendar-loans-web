<template>
  <FilterContainer>
    <template #filterContent>
      <div class="top">
        <button class="default-input clear-btn" @click="clearAllFilters()">
          Clear
        </button>
        <span> Filters </span>
        <button class="default-input done-btn" @click="filterData()">
          Done
        </button>
      </div>
      <div class="filter-dropdown-content">
        <div class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="dateFilter"
              @toggle-check="toggleDate()"
            />
            <label @click="toggleDate()"> Date </label>
          </div>
          <div v-if="dateFilter" class="bottom">
            <!-- <TableDateInput
              placeholder="FROM"
              :date-props="filter.fromDate"
              @update-date="updateFromDate($event)"
            />
            <TableDateInput
              placeholder="TO"
              :date-props="filter.toDate"
              @update-date="updateToDate($event)"
            /> -->
          </div>
        </div>
        <div class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="statusFilter"
              @toggle-check="toggleStatus()"
            />
            <label @click="toggleStatus()"> Status </label>
          </div>
          <div v-if="statusFilter" class="bottom">
            <select v-model="filter.status">
              <option value="success" selected>Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>
        <div v-if="filterPaymentMethod" class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="paymethFilter"
              @toggle-check="togglePaymeth()"
            />
            <label @click="togglePaymeth()"> Payment Method </label>
          </div>
          <div v-if="paymethFilter" class="bottom">
            <select v-model="filter.paymeth">
              <option value="bank transfer" selected>bank transfer</option>
              <option value="cheque">cheque</option>
              <option value="paystack">paystack</option>
              <option value="paypal">paypal</option>
              <option value="stripe">stripe</option>
            </select>
          </div>
        </div>
        <div class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="paytypeFilter"
              @toggle-check="togglePayType()"
            />
            <label @click="togglePayType()"> Transaction Type </label>
          </div>
          <div v-if="paytypeFilter" class="bottom">
            <select v-model="filter.paytype">
              <option value="deposit">deposit</option>
              <option value="withdrawal">withdrawal</option>
            </select>
          </div>
        </div>
      </div>
    </template>
  </FilterContainer>
</template>

<script>
export default {
  props: {
    filterPaymentMethod: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      filter: {
        fromDate: '',
        toDate: '',
        status: '',
        paytype: '',
        paymeth: '',
        id: ''
      },
      dateFilter: false,
      statusFilter: false,
      paytypeFilter: false,
      idFilter: false,
      paymethFilter: false,
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler({ query }) {
        if (query) {
          this.filter.fromDate = query.from
          this.filter.toDate = query.to
          this.filter.status = query.status
        }
        if (this.filter.fromDate || this.filter.toDate) {
          this.dateFilter = true
        }
        if (this.filter.status) {
          this.statusFilter = true
        }
      },
    },
  },
  methods: {
    updateFromDate(e) {
      this.filter.fromDate = e
    },
    updateToDate(e) {
      this.filter.toDate = e
    },
    filterData() {
      if (!this.dateFilter) {
        this.filter.fromDate = ''
        this.filter.toDate = ''
      }
      if (!this.statusFilter) {
        this.filter.status = ''
      }
      if (!this.paytypeFilter) {
        this.filter.paytype = ''
      }
      if (!this.paymethFilter) {
        this.filter.paymeth = ''
      }
      if (!this.idFilter) {
        this.filter.id = ''
      }
      this.$emit('filter-data', this.filter)
    },
    toggleDate() {
      this.dateFilter = !this.dateFilter
    },
    toggleStatus() {
      this.statusFilter = !this.statusFilter
    },
    togglePayType() {
      this.paytypeFilter = !this.paytypeFilter
    },
    togglePaymeth() {
      this.paymethFilter = !this.paymethFilter
    },
    toggleId() {
      this.idFilter = !this.idFilter
    },
    clearAllFilters() {
      this.$emit('clear-filter')
      this.dateFilter = false
      this.statusFilter = false
      this.idFilter = false
      this.paytypeFilter = false
      this.paymethFilter = false
      this.filter.fromDate = ''
      this.filter.toDate = ''
      this.filter.status = ''
      this.filter.paytype = ''
      this.filter.paymeth = ''
      this.filter.id = ''
    },
  },
}
</script>

<style scoped>
.filter-item {
  border-bottom: 1px solid rgba(221, 223, 225, 0.5);
}

.filter-item > * {
  padding: 0 15px;
  height: 50px;
}

.filter-item:first-child {
  border-top: 1px solid rgba(221, 223, 225, 0.5);
}

.filter-item:last-child {
  border-radius: 0 0 13px 13px;
}

.filter-item:last-child div:last-child {
  border-radius: 0 0 10px 10px;
}

.filter-item .top {
  background: #fff;
  display: flex;
  align-items: center;
}

.filter-item .top > label:first-child {
  padding-left: 30px;
}

.filter-item .bottom {
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top;
  animation: squeeze-in 0.2s ease-in-out;
  background: rgba(244, 246, 250, 0.7);
  gap: 10px;
}

.filter-item .bottom input,
.filter-item .bottom select {
  height: 30px;
  border-radius: 5px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 5px;
  background: #fff;
}
</style>
