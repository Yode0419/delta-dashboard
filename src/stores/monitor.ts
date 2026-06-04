import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Metric, Alert, KpiItem } from '@/types'
import { mockMetricsMap, mockAlerts, mockKpiItems } from '@/data/mock'

export const useMonitorStore = defineStore('monitor', () => {
  const metricsMap = ref<Record<string, Metric[]>>(mockMetricsMap)
  const alerts = ref<Alert[]>(mockAlerts)
  const kpiItems = ref<KpiItem[]>(mockKpiItems)

  function tickMetrics() {
    // TODO: called by useSimulation on each tick
  }

  function pushAlert() {
    // TODO: called by useSimulation when a threshold is crossed
  }

  function reset() {
    metricsMap.value = JSON.parse(JSON.stringify(mockMetricsMap))
    alerts.value = JSON.parse(JSON.stringify(mockAlerts))
    kpiItems.value = JSON.parse(JSON.stringify(mockKpiItems))
  }

  return {
    metricsMap,
    alerts,
    kpiItems,
    tickMetrics,
    pushAlert,
    reset,
  }
})
