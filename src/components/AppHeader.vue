<script setup lang="ts" name="AppHeader">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useExperimentStore } from '@/stores/experiment'

const store = useExperimentStore()
const { experiment } = storeToRefs(store)

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
        @click="store.stopExperiment()"
      >
        Stop
      </el-button>
      <el-button v-else class="cta-btn" size="large" type="primary"> Re-run </el-button>
    </div>
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
  gap: 48px;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stat-label {
  color: #909399;
}

.stat-value {
  color: #1a1a1a;
}

.stat-value.running {
  color: #67c23a;
}
.stat-value.stopped {
  color: #f56c6c;
}
.stat-value.completed {
  color: #909399;
}

.cta-btn {
  width: 120px;
}
</style>
