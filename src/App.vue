<script setup lang="ts" name="App">
import { onMounted, onUnmounted } from 'vue'
import { ElLoading } from 'element-plus'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import HeatmapPanel from '@/components/HeatmapPanel.vue'
import LogPanel from '@/components/LogPanel.vue'
import ObjectsPanel from '@/components/ObjectsPanel.vue'
import { useExperimentStream } from '@/composables/useExperimentStream'
import { useExperimentStore } from '@/stores/experiment'
import { useObjectStore } from '@/stores/object'
import { useVersionStore } from '@/stores/version'
import {
  fetchExperiment,
  fetchObjects,
  fetchVersionsMap,
} from '@/services/experimentService'

const experimentStore = useExperimentStore()
const objectStore = useObjectStore()
const versionStore = useVersionStore()
const { start, stop } = useExperimentStream()

onMounted(async () => {
  const loading = ElLoading.service({ fullscreen: true, background: 'rgba(255,255,255,0.85)' })
  const [exp, objs, versMap] = await Promise.all([
    fetchExperiment(),
    fetchObjects(),
    fetchVersionsMap(),
  ])
  experimentStore.hydrate(exp)
  objectStore.hydrate(objs)
  versionStore.hydrate(versMap)
  loading.close()
  start()
})

onUnmounted(() => stop())
</script>

<template>
  <div class="app-shell">
    <AppSidebar />
    <div class="main-area">
      <AppHeader />
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
</style>
