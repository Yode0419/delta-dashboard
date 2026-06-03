<script setup lang="ts" name="StatusCell">
import type { MetricStatus } from '@/types'

defineProps<{ status: MetricStatus | null }>()

const statusLabel: Record<MetricStatus, string> = {
  normal: 'Normal',
  warning: 'Warning',
  critical: 'Critical',
}
</script>

<template>
  <span v-if="status === null">-</span>
  <div v-else class="status-cell">
    <span class="status-dot" :class="status" />
    {{ statusLabel[status] }}
  </div>
</template>

<style scoped>
.status-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.normal   { background: #67c23a; }
.status-dot.warning  { background: #e6a23c; }
.status-dot.critical { background: #f56c6c; }
</style>
