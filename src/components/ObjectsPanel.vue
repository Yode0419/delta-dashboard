<script setup lang="ts" name="ObjectsPanel">
import ObjectList from '@/components/ObjectList.vue'
import ObjectDetail from '@/components/ObjectDetail.vue'
</script>

<template>
  <el-card class="objects-panel" shadow="never">
    <template #header>
      <h2 class="text-h2">Objects</h2>
    </template>
    <el-row class="inner-row">
      <el-col :span="12" class="col-block">
        <ObjectList />
      </el-col>
      <el-col :span="12" class="col-block">
        <ObjectDetail />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.objects-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-card__body) {
  flex: 1;
  padding: 0;
  overflow: hidden;
}

.inner-row {
  height: 100%;
}

.col-block {
  height: 100%;
}

.col-block:first-child {
  border-right: 1px solid var(--el-border-color-light);
}

</style>
