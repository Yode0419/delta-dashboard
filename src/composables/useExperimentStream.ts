import { watch } from 'vue'
import { ElNotification } from 'element-plus'
import { useExperimentStore } from '@/stores/experiment'
import { useMonitorStore } from '@/stores/monitor'
import { useObjectStore } from '@/stores/object'
import { subscribeToExperimentStream } from '@/services/experimentService'
import { TOTAL_TICKS } from '@/data/simulationConfig'

// Module-level singleton — multiple useExperimentStream() calls share the same subscription
let unsubscribe: (() => void) | null = null

export function useExperimentStream() {
  const experimentStore = useExperimentStore()
  const monitorStore = useMonitorStore()
  const objectStore = useObjectStore()

  function start() {
    if (unsubscribe) return
    unsubscribe = subscribeToExperimentStream({
      onTick(tick, isLast) {
        monitorStore.tickMetrics(tick)
        monitorStore.tickKpis(tick)
        monitorStore.pushAlert(tick)
        monitorStore.appendLog(tick, isLast)
        objectStore.updateAllStatusFromMetrics(monitorStore.metricsMap, monitorStore.alerts)
        experimentStore.tickDuration()
        experimentStore.tickProgress(tick, TOTAL_TICKS)
      },
      onComplete() {
        unsubscribe = null
        experimentStore.complete()
        ElNotification({
          title: 'Experiment Completed',
          type: 'success',
          position: 'top-right',
          offset: 72,
          duration: 2000,
        })
      },
    })
  }

  function stop() {
    unsubscribe?.()
    unsubscribe = null
  }

  // React to store status changes so re-run and manual stop are handled automatically
  watch(
    () => experimentStore.experiment.status,
    (newStatus, oldStatus) => {
      if (newStatus === 'running' && oldStatus !== 'running') {
        start()
        ElNotification({
          title: 'Experiment Started',
          type: 'primary',
          position: 'top-right',
          offset: 72,
          duration: 2000,
        })
      } else if (newStatus !== 'running') {
        stop()
      }
    },
  )

  return { start, stop }
}
