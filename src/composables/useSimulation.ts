import { ref, watch } from 'vue'
import { ElNotification } from 'element-plus'
import { useExperimentStore } from '@/stores/experiment'
import { useMonitorStore } from '@/stores/monitor'
import { useObjectStore } from '@/stores/object'
import { TOTAL_TICKS, TICK_INTERVAL_MS } from '@/data/simulationConfig'

// Module-level singleton state — multiple useSimulation() calls share the same timer
const currentTick = ref(0)
const timerId = ref<ReturnType<typeof setInterval> | null>(null)

export function useSimulation() {
  const experimentStore = useExperimentStore()
  const monitorStore = useMonitorStore()
  const objectStore = useObjectStore()

  function tick() {
    currentTick.value++
    const t = currentTick.value
    const isLast = t >= TOTAL_TICKS

    monitorStore.tickMetrics(t)
    monitorStore.tickKpis(t)
    monitorStore.pushAlert(t)
    monitorStore.appendLog(t, isLast)
    objectStore.updateAllStatusFromMetrics(monitorStore.metricsMap, monitorStore.alerts)
    experimentStore.tickDuration()
    experimentStore.tickProgress(t, TOTAL_TICKS)

    if (isLast) {
      stop()
      experimentStore.complete()
      ElNotification({
        title: 'Experiment Completed',
        type: 'success',
        position: 'top-right',
        offset: 72,
        duration: 2000,
      })
    }
  }

  function start() {
    if (timerId.value) return
    timerId.value = setInterval(tick, TICK_INTERVAL_MS)
  }

  function stop() {
    if (timerId.value) {
      clearInterval(timerId.value)
      timerId.value = null
    }
  }

  // React to store status changes so re-run and stop are handled automatically
  watch(
    () => experimentStore.experiment.status,
    (newStatus, oldStatus) => {
      if (newStatus === 'running' && oldStatus !== 'running') {
        currentTick.value = 0
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
