<script setup lang="ts" name="ObjectList">
import { storeToRefs } from 'pinia'
import { useExperimentStore } from '@/stores/experiment'
import StatusCell from '@/components/StatusCell.vue'
import objectModelSvg from '@/assets/object-model-sm.svg'

const store = useExperimentStore()
const { objects, selectedObjectId } = storeToRefs(store)

function handleRowClick(row: { id: string }) {
  store.selectObject(row.id)
}

const severityOrder: Record<string, number> = { critical: 3, warning: 2, normal: 1 }

function sortByStatus(a: { status: string }, b: { status: string }) {
  return (severityOrder[a.status] ?? 0) - (severityOrder[b.status] ?? 0)
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
    <el-table-column prop="status" label="Status" sortable :sort-method="sortByStatus">
      <template #default="{ row }">
        <StatusCell :status="row.versionChanged ? null : row.status" />
      </template>
    </el-table-column>
    <el-table-column prop="alertCount" label="Alert" sortable>
      <template #default="{ row }">
        {{ row.versionChanged ? '-' : row.alertCount > 0 ? row.alertCount : '-' }}
      </template>
    </el-table-column>
    <el-table-column prop="currentVersion" label="Version">
      <template #default="{ row }">
        <div class="version-cell">
          {{ row.currentVersion }}
          <span v-if="row.versionChanged" class="version-changed-dot" />
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}


.version-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.version-changed-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--el-color-primary);
  flex-shrink: 0;
}
</style>
