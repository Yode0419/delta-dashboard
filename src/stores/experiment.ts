import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { Experiment, ObjectItem, Metric, Version, Alert, MetricStatus } from "@/types";
import {
  mockExperiment,
  mockObjects,
  mockMetricsMap,
  mockVersionsMap,
  mockAlerts,
  mockKpiItems,
} from "@/data/mock";

export const useExperimentStore = defineStore("experiment", () => {
  // --- State ---

  // Spread to allow mutation (e.g. status, progress, duration) without altering the mock source
  const experiment = ref<Experiment>({ ...mockExperiment });
  // TODO (Iteration 5): these hold direct references to mock data; Re-run must reassign from mock rather than relying on spread isolation
  const objects = ref<ObjectItem[]>(mockObjects);
  const selectedObjectId = ref<string | null>(mockObjects[0]?.id ?? null);
  const metricsMap = ref<Record<string, Metric[]>>(mockMetricsMap);
  const versionsMap = ref<Record<string, Version[]>>(mockVersionsMap);
  const alerts = ref<Alert[]>(mockAlerts);
  const kpiItems = ref(mockKpiItems);

  // --- Getters ---

  const selectedObject = computed(() =>
    selectedObjectId.value
      ? (objects.value.find((o) => o.id === selectedObjectId.value) ?? null)
      : null,
  );

  const selectedMetrics = computed(() =>
    selectedObjectId.value ? (metricsMap.value[selectedObjectId.value] ?? []) : [],
  );

  const selectedVersions = computed(() =>
    selectedObjectId.value ? (versionsMap.value[selectedObjectId.value] ?? []) : [],
  );

  const selectedAlerts = computed(() =>
    selectedObjectId.value ? alerts.value.filter((a) => a.objectId === selectedObjectId.value) : [],
  );

  const lastRunVersion = computed(() =>
    selectedObjectId.value
      ? (versionsMap.value[selectedObjectId.value]?.find((v) => v.isLastRun)?.label ?? null)
      : null,
  );

  const displayStatus = computed(() =>
    selectedObject.value?.versionChanged ? null : (selectedObject.value?.status ?? null),
  );

  const displayAlertCount = computed(() =>
    selectedObject.value?.versionChanged ? null : (selectedObject.value?.alertCount ?? null),
  );

  // --- Actions ---

  function selectObject(id: string) {
    selectedObjectId.value = id;
  }

  function stopExperiment() {
    experiment.value.status = "stopped";
  }

  // Saves pre-apply state so revertVersion can restore it
  const savedObjectState = new Map<string, { alertCount: number; status: MetricStatus }>();

  function applyVersion(versionId: string) {
    const obj = objects.value.find((o) => o.id === selectedObjectId.value);
    if (!obj) return;
    const versions = versionsMap.value[obj.id] ?? [];
    const target = versions.find((v) => v.id === versionId);
    if (!target) return;

    if (target.isLastRun) {
      revertVersion();
      return;
    }

    savedObjectState.set(obj.id, { alertCount: obj.alertCount, status: obj.status });

    obj.currentVersion = target.label;
    obj.versionChanged = true;
    obj.alertCount = 0;
    obj.status = "normal";

    versions.forEach((v) => {
      v.isCurrent = v.id === versionId;
    });
  }

  function revertVersion() {
    const obj = objects.value.find((o) => o.id === selectedObjectId.value);
    if (!obj) return;
    const versions = versionsMap.value[obj.id] ?? [];
    const lastRun = versions.find((v) => v.isLastRun);
    if (!lastRun) return;

    const saved = savedObjectState.get(obj.id);
    if (saved) {
      obj.alertCount = saved.alertCount;
      obj.status = saved.status;
      savedObjectState.delete(obj.id);
    }

    obj.currentVersion = lastRun.label;
    obj.versionChanged = false;

    versions.forEach((v) => {
      v.isCurrent = v.id === lastRun.id;
    });
  }

  return {
    experiment,
    objects,
    selectedObjectId,
    metricsMap,
    versionsMap,
    alerts,
    kpiItems,
    selectedObject,
    selectedMetrics,
    selectedVersions,
    selectedAlerts,
    lastRunVersion,
    displayStatus,
    displayAlertCount,
    selectObject,
    stopExperiment,
    applyVersion,
    revertVersion,
  };
});
