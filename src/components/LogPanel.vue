<script setup lang="ts" name="LogPanel"></script>

<template>
  <el-card class="log-panel" shadow="never">
    <template #header>
      <h2 class="text-h2">Log</h2>
    </template>
    <div class="log-list text-caption">
      <div class="log-row"><span class="time">00:02:10</span><span>Lorem ipsum dolor sit amet consectetur.</span></div>
      <div class="log-row"><span class="time">00:04:22</span><span>Lorem ipsum dolor sit amet consectetur. Vulputate varius justo velit eget malesuada sem.</span></div>
      <div class="log-row error"><span class="time">00:06:34</span><span>Error: Lorem ipsum dolor sit amet consectetur. Vulputate varius justo velit eget malesuada sem.</span></div>
      <div class="log-row warning"><span class="time">00:08:44</span><span>Warning: Lorem ipsum dolor sit amet consectetur. Vulputate varius justo velit eget malesuada sem.</span></div>
      <div class="log-row"><span class="time">00:10:55</span><span>Log message.........</span></div>
      <div class="log-row"><span class="time">00:12:34</span><span>Running.........</span></div>
    </div>
  </el-card>
</template>

<style scoped>

.log-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-height: 160px;
  overflow-y: auto;
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
