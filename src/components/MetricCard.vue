<script setup lang="ts" name="MetricCard">
import type { Metric } from "@/types";

defineProps<{
  metric: Metric;
  alertDesc?: string;
}>();

const statusLabel: Record<string, string> = {
  normal: "Normal",
  warning: "Warning",
  critical: "Critical",
};
</script>

<template>
  <div class="metric-card">
    <div class="card-header">
      <span class="text-data-label">{{ metric.name }}</span>
      <span class="status-badge">
        <span class="status-dot" :class="metric.status" />
        <span class="text-data-label">{{ statusLabel[metric.status] }}</span>
      </span>
    </div>
    <div class="card-value">
      <span class="text-h2">{{ metric.value }}</span>
      <span class="text-data-label unit">{{ metric.unit }}</span>
    </div>
    <div class="chart-placeholder" />
    <div v-if="alertDesc" class="card-footer">
      <p class="text-caption alert-desc">{{ alertDesc }}</p>
    </div>
  </div>
</template>

<style scoped>
.metric-card {
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-badge {
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
  background: #67c23a;
}
.status-dot.warning {
  background: #e6a23c;
}
.status-dot.critical {
  background: #f56c6c;
}

.card-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.unit {
  color: var(--el-text-color-secondary);
}

.chart-placeholder {
  height: 80px;
  background: var(--el-fill-color-light);
  border-radius: 4px;
}

.card-footer {
  margin: 0 -12px -12px;
  padding: 8px 12px;
  border-top: 1px solid var(--el-border-color-light);
}

.alert-desc {
  margin: 0;
  color: #f56c6c;
}
</style>
