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
        <!-- <div class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="dateFilter"
              @toggle-check="toggleDate()"
            />
            <label @click="toggleDate()"> Date </label>
          </div>
          <div v-if="dateFilter" class="bottom">
            <TableDateInput
              placeholder="FROM"
              :date-props="filter.fromDate"
              @update-date="updateFromDate($event)"
            />
            <TableDateInput
              placeholder="TO"
              :date-props="filter.toDate"
              @update-date="updateToDate($event)"
            />
          </div>
        </div> -->
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
              <option value="ongoing">Ongoing</option>
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
        <!-- <div class="filter-item">
          <div class="top">
            <CustomCheckbox
              :checked="typeFilter"
              @toggle-check="toggleType()"
            />
            <label @click="toggleType()"> Transaction Type </label>
          </div>
          <div v-if="typeFilter" class="bottom">
            <select v-model="filter.type">
              <option value="debit">Debit</option>
              <option value="credit">Credit</option>
            </select>
          </div>
        </div> -->
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
        type: '',
        paymeth: '',
        id: ''
      },
      dateFilter: false,
      statusFilter: false,
      typeFilter: false,
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
      if (!this.typeFilter) {
        this.filter.type = ''
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
    toggleType() {
      this.typeFilter = !this.typeFilter
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
      this.typeFilter = false
      this.paymethFilter = false
      this.filter.fromDate = ''
      this.filter.toDate = ''
      this.filter.status = ''
      this.filter.type = ''
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
  /* animation: squeeze-in 0.2s ease-in-out; */
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



.filter-dropdown-ctn {
  position: absolute;
  top: 110%;
  right: 0;
  width: 250%;
  min-width: 200px;
  box-shadow: var(--container-shadow);
  border: 1px solid rgba(221, 223, 225, 0.5);
  background: #fff;
  transform-origin: top;
  animation: squeeze-in 0.4s ease-in-out;
  border-radius: 13px;
  z-index: 21;
}

.filter-dropdown-ctn > .top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  height: 50px;
  background: #f4f6fa;
  border-radius: 10px 10px 0 0;
}

.filter-dropdown-ctn > .filter-dropdown-content {
  background: #fff;
  border-radius: 0 0 13px 13px;
}

.filter-dropdown-ctn > .top .clear-btn,
.filter-dropdown-ctn > .top .done-btn {
  border-radius: 7px;
  padding: 3px 10px;
  height: 30px;
  font-size: 13px;
  font-weight: 500;
}

.filter-dropdown-ctn > .top .clear-btn {
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: #fff;
}

.filter-dropdown-ctn > .top .done-btn {
  border: 1px solid var(--primary-purple);
  background: var(--primary-purple);
  color: #fff;
}
</style>
