<script setup lang="ts" name="ObjectDetail">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useExperimentStore } from "@/stores/experiment";
import MetricCard from "@/components/MetricCard.vue";
import ChangeVersionDialog from "@/components/ChangeVersionDialog.vue";
import objectModelSvg from "@/assets/object-model.svg";

const store = useExperimentStore();
const { selectedObject, selectedMetrics, selectedAlerts } = storeToRefs(store);

const dialogVisible = ref(false);

const statusLabel: Record<string, string> = {
  normal: "Normal",
  warning: "Warning",
  critical: "Critical",
};

function alertDescFor(metricName: string): string | undefined {
  return selectedAlerts.value.find((a) => a.metric === metricName)?.description;
}
</script>

<template>
  <!-- Empty state -->
  <div v-if="!selectedObject" class="empty-state">
    <p class="text-body">Select an object to view details</p>
  </div>

  <!-- Object detail -->
  <div v-else class="object-detail">
    <div class="summary">
      <div class="summary-header">
        <span class="text-h3">{{ selectedObject.name }}</span>
        <el-button @click="dialogVisible = true">Change Version</el-button>
      </div>
      <div class="summary-body">
        <img :src="objectModelSvg" width="80" />
        <div class="summary-stats">
          <div class="stat">
            <span class="text-data-label stat-label">Status</span>
            <span class="status-value text-data-value">
              <span class="status-dot" :class="selectedObject.status" />
              {{ statusLabel[selectedObject.status] }}
            </span>
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Alert</span>
            <span class="text-data-value">{{ selectedObject.alertCount }}</span>
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Version</span>
            <span class="text-data-value">{{ selectedObject.currentVersion }}</span>
          </div>
        </div>
      </div>
      <p class="text-body description">{{ selectedObject.description }}</p>
    </div>

    <el-divider />

    <div v-if="selectedMetrics.length" class="metrics">
      <MetricCard
        v-for="metric in selectedMetrics"
        :key="metric.name"
        :metric="metric"
        :alert-desc="alertDescFor(metric.name)"
      />
    </div>
    <div v-else class="no-metrics">
      <div class="metric-placeholder" />
      <div class="metric-placeholder" />
    </div>
  </div>

  <ChangeVersionDialog v-model="dialogVisible" />
</template>

<style scoped>
.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--el-text-color-secondary);
}

.object-detail {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.summary-body {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 16px;
}

.summary-stats {
  display: flex;
  flex: 1;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.stat-label {
  color: var(--el-text-color-secondary);
}

.status-value {
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

.description {
  margin: 16px 0 0;
  color: var(--el-text-color-secondary);
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.no-metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.metric-placeholder {
  height: 140px;
  background: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
}
</style>
