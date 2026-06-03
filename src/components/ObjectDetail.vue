<script setup lang="ts" name="ObjectDetail">
import { ref } from 'vue'
import MetricCard from '@/components/MetricCard.vue'
import ChangeVersionDialog from '@/components/ChangeVersionDialog.vue'
import objectModelSvg from '@/assets/object-model.svg'

const dialogVisible = ref(false)
</script>

<template>
  <div class="object-detail">
    <div class="summary">
      <div class="summary-header">
        <span class="text-h3">Fan#2</span>
        <el-button @click="dialogVisible = true">Change Version</el-button>
      </div>
      <div class="summary-body">
        <img :src="objectModelSvg" width="80" />
        <div class="summary-stats">
          <div class="stat">
            <span class="text-data-label stat-label">Status</span>
            <span class="text-data-value">Critical</span>
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Alert</span>
            <span class="text-data-value">2</span>
          </div>
          <div class="stat">
            <span class="text-data-label stat-label">Version</span>
            <span class="text-data-value">v2.0</span>
          </div>
        </div>
      </div>
      <p class="text-body description">Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.</p>
    </div>
    <el-divider />
    <div class="metrics">
      <MetricCard alert-desc="Alert description, Lorem ipsum dolor sit amet consectetur........." />
      <MetricCard alert-desc="Alert description, Lorem ipsum dolor sit amet consectetur........." />
      <MetricCard />
    </div>
  </div>
  <ChangeVersionDialog v-model="dialogVisible" />
</template>

<style scoped>
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

.description {
  margin: 16px 0 0;
}

.stat-label {
  color: var(--el-text-color-secondary);
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
