<script setup lang="ts" name="MetricCard">
const props = defineProps<{ alertDesc?: string }>()
</script>

<template>
  <div class="metric-card">
    <div class="card-header">
      <span class="text-data-label">Fan Speed</span>
      <span class="status-badge">
        <span class="status-dot" />
        <span class="text-data-label">Critical</span>
      </span>
    </div>
    <div class="card-value">
      <span class="text-h2">4850</span>
      <span class="text-data-label unit">RPM</span>
    </div>
    <div class="chart-placeholder" />
    <div v-if="props.alertDesc" class="card-footer">
      <p class="text-caption alert-desc">{{ props.alertDesc }}</p>
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
  background: #f56c6c;
  flex-shrink: 0;
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
