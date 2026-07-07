<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { ElMessageBox } from 'element-plus'
import { useExperimentStore } from '@/stores/experiment'
import { useExperimentSession } from '@/composables/useExperimentSession'

const { experiment } = storeToRefs(useExperimentStore())
const { stopExperiment, rerun } = useExperimentSession()

function handleRerunClick() {
  ElMessageBox.confirm(
    "The current run's metrics, alerts, and logs will be cleared, and a new run will start.",
    'Re-run Experiment?',
    {
      confirmButtonText: 'Re-run',
      cancelButtonText: 'Cancel',
    },
  )
    .then(() => rerun())
    .catch(() => {})
}

const statusLabel: Record<string, string> = {
  running: 'Running',
  completed: 'Completed',
  stopped: 'Stopped',
}

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  return [h, m, s].map((v) => String(v).padStart(2, '0')).join(':')
}

const durationDisplay = computed(() => formatDuration(experiment.value.duration))

</script>

<template>
  <div>
    <div class="header">
      <span class="title text-h1">{{ experiment.name }}</span>
      <div class="header-right">
        <div class="stat">
          <span class="stat-label text-data-label">Status</span>
          <span class="stat-value text-h1" :class="experiment.status">
            {{ statusLabel[experiment.status] }}
          </span>
        </div>
        <div class="stat">
          <span class="stat-label text-data-label">Duration</span>
          <span class="stat-value text-h1">{{ durationDisplay }}</span>
        </div>
        <el-button
          v-if="experiment.status === 'running'"
          class="cta-btn"
          size="large"
          type="danger"
          plain
          @click="stopExperiment()"
        >
          Stop
        </el-button>
        <el-button v-else class="cta-btn" size="large" type="primary" @click="handleRerunClick">
          Re-run
        </el-button>
      </div>
    </div>
    <el-progress
      v-if="experiment.status === 'running'"
      class="flat-progress"
      :percentage="experiment.progress"
      text-inside
      :stroke-width="16"
    />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 64px;
  border-bottom: 1px solid #e4e7ed;
  background: #fff;
}

.title {
  color: #1a1a1a;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 140px;
}

.stat-label {
  color: #909399;
}

.stat-value {
  color: #1a1a1a;
}

.stat-value.running {
  color: var(--el-color-primary);
}
.stat-value.stopped {
  color: #909399;
}
.stat-value.completed {
  color: #909399;
}

.cta-btn {
  width: 120px;
}

:deep(.flat-progress .el-progress-bar__outer),
:deep(.flat-progress .el-progress-bar__inner) {
  border-radius: 0;
}
</style>
