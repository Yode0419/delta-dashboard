<script setup lang="ts" name="App">
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import HeatmapPanel from '@/components/HeatmapPanel.vue'
import LogPanel from '@/components/LogPanel.vue'
import ObjectsPanel from '@/components/ObjectsPanel.vue'
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="main-area">
      <AppHeader />
      <el-progress class="flat-progress" :percentage="88" :show-text="false" :stroke-width="6" />
      <div class="content-area">
        <el-row :gutter="16" class="content-row">
          <el-col :span="10" class="left-col">
            <HeatmapPanel />
            <LogPanel />
          </el-col>
          <el-col :span="14" class="right-col">
            <ObjectsPanel />
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #fafafa;
}

.content-area {
  flex: 1;
  overflow: hidden;
  padding: 32px;
}

.content-row {
  height: 100%;
}

.left-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  overflow: hidden;
}

.right-col {
  height: 100%;
}

:deep(.flat-progress .el-progress-bar__outer),
:deep(.flat-progress .el-progress-bar__inner) {
  border-radius: 0;
}
</style>
