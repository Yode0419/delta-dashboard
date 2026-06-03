<script setup lang="ts" name="HeatmapPanel">
import KpiCard from "@/components/KpiCard.vue";
import heatmapPreview from "@/assets/heatmap-preview.png";
</script>

<template>
  <el-card class="heatmap-panel" shadow="never">
    <template #header>
      <h2 class="text-h2">3D heatmap</h2>
    </template>
    <img :src="heatmapPreview" class="heatmap-placeholder" />
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
  width: 100%;
  object-fit: contain;
  border-radius: 4px;
  min-height: 0;
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
