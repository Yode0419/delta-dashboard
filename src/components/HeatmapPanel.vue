<script setup lang="ts" name="HeatmapPanel">
import KpiCard from '@/components/KpiCard.vue'
</script>

<template>
  <el-card class="heatmap-panel" shadow="never">
    <template #header>3D heatmap</template>
    <div class="heatmap-placeholder" />
    <div class="kpi-row">
      <KpiCard />
      <KpiCard />
      <KpiCard />
      <KpiCard />
    </div>
  </el-card>
</template>

<style scoped>
.heatmap-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-card__body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.heatmap-placeholder {
  flex: 1;
  background: #f0f0f0;
  border-radius: 4px;
}

.kpi-row {
  display: flex;
  gap: 8px;
  margin-top: 12px;
  flex-shrink: 0;
}

.kpi-row > * {
  flex: 1;
}
</style>
