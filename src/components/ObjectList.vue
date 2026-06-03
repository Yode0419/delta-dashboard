<script setup lang="ts" name="ObjectList">
import { storeToRefs } from 'pinia'
import { useExperimentStore } from '@/stores/experiment'
import objectModelSvg from '@/assets/object-model-sm.svg'

const store = useExperimentStore()
const { objects, selectedObjectId } = storeToRefs(store)

function handleRowClick(row: { id: string }) {
  store.selectObject(row.id)
}
</script>

<template>
  <el-table
    :data="objects"
    :highlight-current-row="true"
    :current-row-key="selectedObjectId ?? undefined"
    row-key="id"
    height="100%"
    @row-click="handleRowClick"
  >
    <el-table-column width="40" :show-overflow-tooltip="false">
      <template #default>
        <div class="icon-cell">
          <img :src="objectModelSvg" width="20" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Object" sortable width="140" />
    <el-table-column prop="status" label="Status" sortable>
      <template #default="{ row }">
        <div class="status-cell">
          <span class="status-dot" :class="row.status" />
          {{ row.status.charAt(0).toUpperCase() + row.status.slice(1) }}
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="alertCount" label="Alert" sortable>
      <template #default="{ row }">
        {{ row.alertCount > 0 ? row.alertCount : '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="currentVersion" label="Version" />
  </el-table>
</template>

<style scoped>
.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.normal   { background: #67c23a; }
.status-dot.warning  { background: #e6a23c; }
.status-dot.critical { background: #f56c6c; }
</style>
