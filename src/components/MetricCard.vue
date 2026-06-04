<script setup lang="ts" name="MetricCard">
import type { Metric } from '@/types'
import StatusCell from '@/components/StatusCell.vue'
import SparklineChart from '@/components/SparklineChart.vue'

defineProps<{
  metric: Metric
  alertDesc?: string
}>()
</script>

<template>
  <div class="metric-card">
    <div class="card-header">
      <span class="text-data-label">{{ metric.label }}</span>
      <StatusCell :status="metric.status" />
    </div>
    <div class="card-value">
      <span class="text-h2">{{ metric.value ?? '-' }}</span>
      <span class="text-body-cap">{{ metric.value !== null ? metric.unit : '' }}</span>
    </div>
    <SparklineChart
      :history="metric.history"
      :warning-threshold="metric.warningThreshold"
      :critical-threshold="metric.criticalThreshold"
      :unit="metric.unit"
    />
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

.card-value {
  display: flex;
  align-items: baseline;
  gap: 6px;
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
