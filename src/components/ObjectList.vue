<script setup lang="ts" name="ObjectList">
import objectModelSvg from "@/assets/object-model-sm.svg";
const objects = [
  { name: "Fan#1", status: "Normal", alert: 0, version: "v2.0" },
  { name: "Fan#2", status: "Critical", alert: 2, version: "v2.0" },
  { name: "HeatSink#1", status: "Normal", alert: 0, version: "v1.0" },
  { name: "HeatSink#2", status: "Normal", alert: 0, version: "v1.1" },
  { name: "Cooler#1", status: "Normal", alert: 0, version: "v3.0" },
  { name: "Cooler#2", status: "Normal", alert: 0, version: "v3.1" },
  { name: "ThermalPad#1", status: "Normal", alert: 0, version: "v2.2" },
  { name: "ThermalPad#2", status: "Warning", alert: 1, version: "v2.3" },
  { name: "ServerRack#1", status: "Critical", alert: 1, version: "v1.5" },
  { name: "ServerRack#2", status: "Normal", alert: 0, version: "v1.6" },
  { name: "Chassis#1", status: "Normal", alert: 0, version: "v1.8" },
  { name: "Chassis#2", status: "Normal", alert: 0, version: "v1.9" },
  { name: "Motherboard#1", status: "Normal", alert: 0, version: "v4.0" },
  { name: "Motherboard#2", status: "Normal", alert: 0, version: "v4.1" },
];
</script>

<template>
  <el-table :data="objects" highlight-current-row height="100%">
    <el-table-column width="40" :show-overflow-tooltip="false">
      <template #default>
        <div class="icon-cell">
          <img :src="objectModelSvg" width="20" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="Object" sortable width="140" />
    <el-table-column prop="status" label="Status" sortable />
    <el-table-column prop="alert" label="Alert" sortable>
      <template #default="{ row }">
        {{ row.alert > 0 ? row.alert : "-" }}
      </template>
    </el-table-column>
    <el-table-column prop="version" label="Version" />
  </el-table>
</template>

<style scoped>
.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
