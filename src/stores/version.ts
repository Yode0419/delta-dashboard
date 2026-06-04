import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Version, MetricStatus } from '@/types'
import { mockVersionsMap } from '@/data/mock'

const savedObjectState = new Map<string, { alertCount: number; status: MetricStatus | null }>()

export const useVersionStore = defineStore('version', () => {
  const versionsMap = ref<Record<string, Version[]>>(mockVersionsMap)

  function setCurrentVersion(objectId: string, versionId: string) {
    const versions = versionsMap.value[objectId]
    if (!versions) return
    versions.forEach((v) => {
      v.isCurrent = v.id === versionId
    })
  }

  function saveState(objectId: string, state: { alertCount: number; status: MetricStatus | null }) {
    savedObjectState.set(objectId, state)
  }

  function getState(objectId: string) {
    return savedObjectState.get(objectId)
  }

  function clearState(objectId: string) {
    savedObjectState.delete(objectId)
  }

  function reset() {
    versionsMap.value = JSON.parse(JSON.stringify(mockVersionsMap))
    savedObjectState.clear()
  }

  return {
    versionsMap,
    setCurrentVersion,
    saveState,
    getState,
    clearState,
    reset,
  }
})
