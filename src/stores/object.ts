import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ObjectItem, Metric, Alert, MetricStatus } from '@/types'
import { mockObjects } from '@/data/mock'

export const useObjectStore = defineStore('object', () => {
  const objects = ref<ObjectItem[]>(JSON.parse(JSON.stringify(mockObjects)))
  const selectedObjectId = ref<string | null>(mockObjects[0]?.id ?? null)

  const selectedObject = computed(() =>
    selectedObjectId.value
      ? (objects.value.find((o) => o.id === selectedObjectId.value) ?? null)
      : null,
  )

  const displayStatus = computed(() =>
    selectedObject.value?.versionChanged ? null : (selectedObject.value?.status ?? null),
  )

  const displayAlertCount = computed(() =>
    selectedObject.value?.versionChanged ? null : (selectedObject.value?.alertCount ?? null),
  )

  function selectObject(id: string) {
    selectedObjectId.value = id
  }

  function markVersionChanged(id: string, newVersion: string) {
    const obj = objects.value.find((o) => o.id === id)
    if (!obj) return
    obj.currentVersion = newVersion
    obj.versionChanged = true
    obj.alertCount = 0
    obj.status = 'normal'
  }

  function unmarkVersionChanged(
    id: string,
    saved: { alertCount: number; status: MetricStatus | null },
    lastRunVersion: string,
  ) {
    const obj = objects.value.find((o) => o.id === id)
    if (!obj) return
    obj.currentVersion = lastRunVersion
    obj.versionChanged = false
    obj.alertCount = saved.alertCount
    obj.status = saved.status
  }

  function updateAllStatusFromMetrics(metricsMap: Record<string, Metric[]>, alerts: Alert[]) {
    for (const obj of objects.value) {
      if (obj.versionChanged) continue
      const metrics = metricsMap[obj.id]
      if (!metrics) continue

      const statuses = metrics.map((m) => m.status)
      obj.status = statuses.includes('critical')
        ? 'critical'
        : statuses.includes('warning')
          ? 'warning'
          : 'normal'

      obj.alertCount = alerts.filter((a) => a.objectId === obj.id).length
    }
  }

  function reset() {
    objects.value = JSON.parse(JSON.stringify(mockObjects))
    selectedObjectId.value = mockObjects[0]?.id ?? null
  }

  return {
    objects,
    selectedObjectId,
    selectedObject,
    displayStatus,
    displayAlertCount,
    selectObject,
    markVersionChanged,
    unmarkVersionChanged,
    updateAllStatusFromMetrics,
    reset,
  }
})
