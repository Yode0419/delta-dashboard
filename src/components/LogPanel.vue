<script setup lang="ts" name="LogPanel">
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useMonitorStore } from '@/stores/monitor'

const { logs } = storeToRefs(useMonitorStore())
const listEl = ref<HTMLDivElement | null>(null)

watch(
  logs,
  async () => {
    await nextTick()
    if (listEl.value) listEl.value.scrollTop = listEl.value.scrollHeight
  },
  { deep: true },
)
</script>

<template>
  <el-card class="log-panel" shadow="never">
    <template #header>
      <h2 class="text-h2">Log</h2>
    </template>
    <div ref="listEl" class="log-list text-caption">
      <div
        v-for="(entry, i) in logs"
        :key="i"
        class="log-row"
        :class="entry.level === 'error' ? 'error' : entry.level === 'warning' ? 'warning' : ''"
      >
        <span class="time">{{ entry.time }}</span>
        <span>{{ entry.message }}</span>
      </div>
      <div v-if="logs.length === 0" class="log-row">
        <span class="time">—</span>
        <span>Waiting for simulation to start…</span>
      </div>
    </div>
  </el-card>
</template>

<style scoped>
:deep(.el-card__body) {
  padding: 0;
}

.log-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  height: 160px;
  overflow-y: auto;
  padding: 12px 16px;
}

.log-row {
  display: flex;
  gap: 12px;
  color: #606266;
}

.log-row.error {
  color: #f56c6c;
}

.log-row.warning {
  color: #e6a23c;
}

.time {
  flex-shrink: 0;
  color: #909399;
}
</style>
