<script setup lang="ts" name="AppHeader"></script>

<template>
  <div class="header">
    <span class="title text-h1">Server Thermal Simulation #003</span>
    <div class="header-right">
      <div class="stat">
        <span class="stat-label text-label">Status</span>
        <span class="stat-value text-h1 running">Running</span>
      </div>
      <div class="stat">
        <span class="stat-label text-label">Duration</span>
        <span class="stat-value text-h1">00:12:34</span>
      </div>
      <el-button size="large" type="danger" plain>Stop</el-button>
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
  align-items: flex-end;
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
</style>
