<script setup lang="ts" name="ObjectDetail">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExperimentStore } from '@/stores/experiment'
import { useObjectStore } from '@/stores/object'
import { useExperimentSession } from '@/composables/useExperimentSession'
import MetricCard from '@/components/MetricCard.vue'
import ChangeVersionDialog from '@/components/ChangeVersionDialog.vue'
import StatusCell from '@/components/StatusCell.vue'
import objectModelSvg from '@/assets/object-model.svg'

const { experiment } = storeToRefs(useExperimentStore())
const { selectedObject, displayStatus, displayAlertCount } = storeToRefs(useObjectStore())
const {
  selectedMetrics,
  selectedAlerts,
  lastRunVersion,
  selectedObjectDescription,
  revertVersion,
} = useExperimentSession()

const dialogVisible = ref(false)

function alertDescFor(metricName: string): string | undefined {
  const matches = selectedAlerts.value.filter((a) => a.metric === metricName)
  return matches.at(-1)?.description
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
        <el-button :disabled="experiment.status === 'running'" @click="dialogVisible = true"
          >Change Version</el-button
        >
      </div>
      <div class="summary-body">
        <img :src="objectModelSvg" width="80" />
        <div class="summary-stats">
          <div class="stat">
            <span class="text-data-label stat-label">Status</span>
            <StatusCell :status="displayStatus" class="text-data-value" />
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Alert</span>
            <span class="text-data-value">{{ displayAlertCount ?? '-' }}</span>
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Version</span>
            <span class="text-data-value">{{ selectedObject.currentVersion }}</span>
          </div>
        </div>
      </div>
      <p class="text-body description">{{ selectedObjectDescription }}</p>
    </div>

    <el-divider />

    <div v-if="selectedObject.versionChanged" class="version-changed-state">
      <p class="text-body no-result-text">
        No results yet.<br />
        Re-run to see results for {{ selectedObject.currentVersion }}.
      </p>
      <el-button @click="revertVersion()">Revert to {{ lastRunVersion }}</el-button>
    </div>
    <div v-else-if="selectedMetrics.length" class="metrics">
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
  padding: 0 16px 16px;
  overflow-y: auto;
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
  padding: 16px 0 8px;
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

.description {
  margin: 16px 0 0;
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

.version-changed-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 0;
}

.no-result-text {
  color: var(--el-text-color-secondary);
  text-align: center;
}

.metric-placeholder {
  height: 140px;
  background: var(--el-fill-color-light);
  border: 1px solid var(--el-border-color-light);
  border-radius: 4px;
}
</style>
