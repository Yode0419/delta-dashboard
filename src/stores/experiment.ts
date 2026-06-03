import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Experiment, ObjectItem, Metric, Version, Alert } from '@/types'
import { mockExperiment, mockObjects, mockMetricsMap, mockVersionsMap, mockAlerts, mockKpiItems } from '@/data/mock'

export const useExperimentStore = defineStore('experiment', () => {
  // --- State ---

  // Spread to allow mutation (e.g. status, progress, duration) without altering the mock source
  const experiment = ref<Experiment>({ ...mockExperiment })
  // TODO (Iteration 5): these hold direct references to mock data; Re-run must reassign from mock rather than relying on spread isolation
  const objects = ref<ObjectItem[]>(mockObjects)
  const selectedObjectId = ref<string | null>(mockObjects[0]?.id ?? null)
  const metricsMap = ref<Record<string, Metric[]>>(mockMetricsMap)
  const versionsMap = ref<Record<string, Version[]>>(mockVersionsMap)
  const alerts = ref<Alert[]>(mockAlerts)
  const kpiItems = ref(mockKpiItems)

  // --- Getters ---

  const selectedObject = computed(() =>
    selectedObjectId.value
      ? (objects.value.find((o) => o.id === selectedObjectId.value) ?? null)
      : null,
  )

  const selectedMetrics = computed(() =>
    selectedObjectId.value ? (metricsMap.value[selectedObjectId.value] ?? []) : [],
  )

  const selectedVersions = computed(() =>
    selectedObjectId.value ? (versionsMap.value[selectedObjectId.value] ?? []) : [],
  )

  const selectedAlerts = computed(() =>
    selectedObjectId.value
      ? alerts.value.filter((a) => a.objectId === selectedObjectId.value)
      : [],
  )

  // --- Actions ---

  function selectObject(id: string) {
    selectedObjectId.value = id
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
    selectObject,
  }
})
