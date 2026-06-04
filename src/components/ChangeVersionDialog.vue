<script setup lang="ts" name="ChangeVersionDialog">
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useObjectStore } from '@/stores/object'
import { useExperimentSession } from '@/composables/useExperimentSession'
import type { Version } from '@/types'
import objectModelSvg from '@/assets/object-model.svg'

const visible = defineModel<boolean>()

const { selectedObject } = storeToRefs(useObjectStore())
const { selectedVersions, applyVersion } = useExperimentSession()

const currentVersionId = computed(() => selectedVersions.value.find((v) => v.isCurrent)?.id ?? null)

const selectedVersionId = ref<string | null>(null)

// Reset selection to current version each time dialog opens
watch(visible, (val) => {
  if (val) selectedVersionId.value = currentVersionId.value
})

function onCancel() {
  visible.value = false
}

function onApply() {
  if (selectedVersionId.value) {
    applyVersion(selectedVersionId.value)
  }
  visible.value = false
}
</script>

<template>
  <el-dialog v-model="visible" width="960">
    <template #header>
      <h2 class="text-h2">Change Version for {{ selectedObject?.name }}</h2>
    </template>

    <div class="dialog-header">
      <img :src="objectModelSvg" width="80" />
      <div class="header-info">
        <div class="info-item">
          <span class="text-data-label info-label">Object</span>
          <span class="text-data-value">{{ selectedObject?.name }}</span>
        </div>
        <div class="info-item">
          <span class="text-data-label info-label">Current Version</span>
          <span class="text-data-value">{{ selectedObject?.currentVersion }}</span>
        </div>
      </div>
    </div>

    <el-table
      :data="selectedVersions"
      highlight-current-row
      @row-click="(row: Version) => (selectedVersionId = row.id)"
    >
      <el-table-column width="48" :show-overflow-tooltip="false">
        <template #default="{ row }">
          <el-radio v-model="selectedVersionId" :value="row.id" />
        </template>
      </el-table-column>
      <el-table-column label="Version" width="200">
        <template #default="{ row }">
          <span>{{ row.label }}</span>
          <el-tag v-if="row.isLastRun" size="small" type="info" style="margin-left: 6px">
            Last Run
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="Created Date" width="140" />
      <el-table-column
        prop="description"
        label="Description"
        :show-overflow-tooltip="{ placement: 'bottom' }"
      />
    </el-table>

    <template #footer>
      <el-button @click="onCancel">Cancel</el-button>
      <el-button type="primary" @click="onApply">Apply</el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
.dialog-header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 20px;
}

.header-info {
  display: flex;
  gap: 64px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-label {
  color: var(--el-text-color-secondary);
}
</style>
