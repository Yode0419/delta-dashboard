<script setup lang="ts" name="KpiCard">
import type { KpiItem } from '@/types'

defineProps<{ item: KpiItem }>()
</script>

<template>
  <div class="kpi-card">
    <div class="card-header">
      <span class="text-data-label">{{ item.label }}</span>
      <span class="status-dot" :class="item.status" />
    </div>
    <div class="card-value">
      <span class="text-h1">{{ item.value }}</span>
      <span class="text-body unit">{{ item.unit }}</span>
    </div>
  </div>
</template>

<style scoped>
.kpi-card {
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.card-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-top: auto;
}

.unit {
  color: var(--el-text-color-secondary);
}
</style>
