<script setup lang="ts" name="ObjectDetail">
import MetricCard from '@/components/MetricCard.vue'
</script>

<template>
  <div class="object-detail">
    <div class="summary" />
    <el-divider />
    <div class="metrics">
      <MetricCard />
      <MetricCard />
      <MetricCard />
    </div>
  </div>
</template>

<style scoped>
.object-detail {
  height: 100%;
  padding: 16px;
  overflow-y: auto;
}

.summary {
  height: 160px;
  background: #fdf6ec;
  border-radius: 4px;
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
