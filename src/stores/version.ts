import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Version, MetricStatus } from '@/types'

const savedObjectState = new Map<string, { alertCount: number; status: MetricStatus | null }>()

export const useVersionStore = defineStore('version', () => {
  const versionsMap = ref<Record<string, Version[]>>({})

  function hydrate(data: Record<string, Version[]>) {
    versionsMap.value = JSON.parse(JSON.stringify(data))
  }

  function setCurrentVersion(objectId: string, versionId: string) {
    const versions = versionsMap.value[objectId]
    if (!versions) return
    versions.forEach((v) => {
      v.isCurrent = v.id === versionId
    })
  }

  // A new run executes each object's current version, so it becomes the new
  // "last run"; saved pre-swap state belongs to the previous run and is dropped.
  function promoteCurrentToLastRun() {
    for (const versions of Object.values(versionsMap.value)) {
      versions.forEach((v) => {
        v.isLastRun = v.isCurrent
      })
    }
    savedObjectState.clear()
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
    savedObjectState.clear()
  }

  return {
    versionsMap,
    hydrate,
    setCurrentVersion,
    promoteCurrentToLastRun,
    saveState,
    getState,
    clearState,
    reset,
  }
})
