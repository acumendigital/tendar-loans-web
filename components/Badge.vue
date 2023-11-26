<template>
  <div :class="`${type}-status badge`">
<svg v-if="type.includes('success')" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7103 7.87091C18.8978 8.05844 19.0031 8.31275 19.0031 8.57791C19.0031 8.84308 18.8978 9.09738 18.7103 9.28491L10.7103 17.2849C10.5228 17.4724 10.2685 17.5777 10.0033 17.5777C9.73817 17.5777 9.48386 17.4724 9.29634 17.2849L5.29634 13.2849C5.11418 13.0963 5.01338 12.8437 5.01566 12.5815C5.01794 12.3193 5.12311 12.0685 5.30852 11.8831C5.49393 11.6977 5.74474 11.5925 6.00694 11.5902C6.26913 11.588 6.52173 11.6888 6.71034 11.8709L10.0033 15.1639L17.2963 7.87091C17.4839 7.68344 17.7382 7.57812 18.0033 7.57812C18.2685 7.57812 18.5228 7.68344 18.7103 7.87091Z" fill="#22C348"/>
</svg>
    <svg v-else-if="type.includes('fail')" xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
  <circle cx="13" cy="12.7578" r="4" fill="#EF4444"/>
</svg>
    <span>{{ text || type }}</span>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: () => ''
    },
    text: {
      type: String,
      default: () => ''
    }
  }
}
</script>

<style scoped>

.active-status,
.inactive-status,
.default-status,
.owing-status,
.blacklisted-status,
.ongoing-status,
.outstanding-status,
.unsuccessful-status,
.cancelled-status,
.successful-status,
.completed-status,
.pending-status,
.unpaid-status,
.countered-status,
.rejected-status,
.accepted-status,
.success-status,
.verified-status,
.edit-status,
.paid-status,
.paid-status,
.unpaid-status,
.failed-status,
.credit-status,
.debit-status {
  border-radius: 6px;
  width: fit-content;
  height: fit-content;
  font-size: 13px;
  padding: 3px 10px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  font-weight: 500;
}

.badge span {
  color: inherit;
}

.successful-status,
.completed-status,
.accepted-status,
.success-status,
.verified-status,
.active-status,
.paid-status,
.credit-status {
  background: var(--success-bg) !important;
  color: var(--success) !important;
}

.successful-text {
  color: var(--success) !important;
}

.pending-text {
  color: var(--ongoing) !important;
}

.failed-text {
  color: var(--failure) !important;
}

.ongoing-status,
.pending-status,
.countered-status,
.outstanding-status,
.unpaid-status {
  background: var(--ongoing-bg) !important;
  color: var(--ongoing) !important;
}

.inactive-status,
.edit-status {
  background: rgba(136, 143, 155, 0.1) !important;
  color: var(--gray-dark) !important;
}

.owing-status,
.blacklisted-status,
.rejected-status,
.unpaid-status,
.failed-status,
.debit-status {
  background: var(--failure-bg) !important;
  color: var(--failure) !important;
}

.default-status {
  background: var(--default-bg) !important;
  color: var(--default) !important;
}

.successful-text {
  color: var(--success) !important;
}

.failed-text {
  color: #d73c27 !important;
}

.sm-text {
  font-size: 14px;
}

.success,
.successful-status,
.completed-status,
.accepted-status,
.verified-status,
.success-status {
  color: var(--success) !important;
}

.failure,
.unsuccessful-status,
.cancelled-status {
  color: var(--failure) !important;
}

.unsuccessful-status,
.cancelled-status {
  background: var(--failure-bg);
}
</style>