<script setup lang="ts">
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

.status-dot.normal {
  background: #43a43c;
}
.status-dot.warning {
  background: #f5bb11;
}
.status-dot.critical {
  background: #de2a15;
}
</style>
