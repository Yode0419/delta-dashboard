import { computed } from 'vue'
import { ElNotification } from 'element-plus'
import { useExperimentStore } from '@/stores/experiment'
import { useObjectStore } from '@/stores/object'
import { useMonitorStore } from '@/stores/monitor'
import { useVersionStore } from '@/stores/version'
import {
  stopExperiment as apiStop,
  rerunExperiment as apiRerun,
  applyVersion as apiApplyVersion,
  revertVersion as apiRevertVersion,
} from '@/services/experimentService'

export function useExperimentSession() {
  const experimentStore = useExperimentStore()
  const objectStore = useObjectStore()
  const monitorStore = useMonitorStore()
  const versionStore = useVersionStore()

  // --- Cross-store derived state ---

  const selectedMetrics = computed(
    () => monitorStore.metricsMap[objectStore.selectedObjectId ?? ''] ?? [],
  )

  const selectedAlerts = computed(() =>
    monitorStore.alerts.filter((a) => a.objectId === objectStore.selectedObjectId),
  )

  const selectedVersions = computed(
    () => versionStore.versionsMap[objectStore.selectedObjectId ?? ''] ?? [],
  )

  const lastRunVersion = computed(
    () =>
      versionStore.versionsMap[objectStore.selectedObjectId ?? '']?.find((v) => v.isLastRun)
        ?.label ?? null,
  )

  const selectedObjectDescription = computed(
    () => selectedVersions.value.find((v) => v.isCurrent)?.description ?? '',
  )

  // --- Business actions ---

  function applyVersion(versionId: string) {
    if (experimentStore.experiment.status === 'running') return

    const obj = objectStore.selectedObject
    if (!obj) return

    const versions = versionStore.versionsMap[obj.id] ?? []
    const target = versions.find((v) => v.id === versionId)
    if (!target) return

    if (target.isLastRun) {
      revertVersion()
      return
    }

    // Optimistic update — fire & forget
    apiApplyVersion(obj.id, versionId)
    versionStore.saveState(obj.id, { alertCount: obj.alertCount, status: obj.status })
    objectStore.markVersionChanged(obj.id, target.label)
    versionStore.setCurrentVersion(obj.id, versionId)
  }

  function revertVersion() {
    if (experimentStore.experiment.status === 'running') return

    const obj = objectStore.selectedObject
    if (!obj) return

    const versions = versionStore.versionsMap[obj.id] ?? []
    const lastRun = versions.find((v) => v.isLastRun)
    if (!lastRun) return

    const saved = versionStore.getState(obj.id)
    if (saved) {
      // Optimistic update — fire & forget
      apiRevertVersion(obj.id)
      objectStore.unmarkVersionChanged(obj.id, saved, lastRun.label)
      versionStore.clearState(obj.id)
    }

    versionStore.setCurrentVersion(obj.id, lastRun.id)
  }

  function stopExperiment() {
    // Optimistic update — fire & forget
    apiStop(experimentStore.experiment.id)
    experimentStore.stop()
    ElNotification({
      title: 'Experiment Stopped',
      type: 'error',
      position: 'top-right',
      offset: 72,
      duration: 2000,
    })
  }

  function rerun() {
    const status = experimentStore.experiment.status
    if (status === 'running') return

    // Optimistic update — fire & forget
    apiRerun(experimentStore.experiment.id)
    objectStore.reset()
    monitorStore.reset()
    experimentStore.reset()
    // versionStore intentionally not reset — preserves version changes for re-run
  }

  return {
    selectedMetrics,
    selectedAlerts,
    selectedVersions,
    lastRunVersion,
    selectedObjectDescription,
    applyVersion,
    revertVersion,
    stopExperiment,
    rerun,
  }
}
