<script setup lang="ts" name="ChangeVersionDialog">
import { ref } from "vue";
import objectModelSvg from "@/assets/object-model.svg";

const visible = defineModel<boolean>();

const currentVersion = "v2.0";
const selectedVersion = ref(currentVersion);

const versions = [
  {
    version: "v1.0",
    createdDate: "2026-01-05 08:00",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v1.5",
    createdDate: "2026-02-10 12:30",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v2.0",
    createdDate: "2026-03-15 16:45",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v2.5",
    createdDate: "2026-04-20 20:00",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v3.0",
    createdDate: "2026-06-25 00:15",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v3.5",
    createdDate: "2026-07-30 04:30",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v4.0",
    createdDate: "2026-08-04 08:45",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v4.1",
    createdDate: "2026-09-09 13:00",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
  {
    version: "v4.2",
    createdDate: "2026-10-14 17:15",
    description:
      "Object description, Lorem ipsum dolor sit amet consectetur. Tempor ante sit pulvinar viverra mi nam.",
  },
];

function onCancel() {
  selectedVersion.value = currentVersion;
  visible.value = false;
}

function onApply() {
  visible.value = false;
}
</script>

<template>
  <el-dialog v-model="visible" width="960">
    <template #header>
      <h2 class="text-h2">Change Version for Fan#2</h2>
    </template>
    <div class="dialog-header">
      <img :src="objectModelSvg" width="80" />
      <div class="header-info">
        <div class="info-item">
          <span class="text-data-label info-label">Object</span>
          <span class="text-data-value">Fan#2</span>
        </div>
        <div class="info-item">
          <span class="text-data-label info-label">Current Version</span>
          <span class="text-data-value">{{ currentVersion }}</span>
        </div>
      </div>
    </div>

    <el-table
      :data="versions"
      highlight-current-row
      @row-click="(row: { version: string }) => (selectedVersion = row.version)"
    >
      <el-table-column width="48" :show-overflow-tooltip="false">
        <template #default="{ row }">
          <el-radio v-model="selectedVersion" :value="row.version" />
        </template>
      </el-table-column>
      <el-table-column label="Version" width="160">
        <template #default="{ row }">
          <span>{{ row.version }}</span>
          <el-tag
            v-if="row.version === currentVersion"
            size="small"
            type="info"
            style="margin-left: 6px"
            >Last Run</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="createdDate" label="Created Date" width="180" />
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
