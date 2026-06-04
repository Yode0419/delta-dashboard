import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Metric, Alert, KpiItem, LogEntry, MetricStatus } from '@/types'
import { mockMetricTemplates, mockAlerts, mockKpiTemplates } from '@/data/mock'
import { generateMetricsMap, generateKpiItems } from '@/data/scriptGenerator'
import { TOTAL_TICKS } from '@/data/simulationConfig'

export const useMonitorStore = defineStore('monitor', () => {
  const metricsMap = ref<Record<string, Metric[]>>(
    generateMetricsMap(mockMetricTemplates, TOTAL_TICKS),
  )
  const alerts = ref<Alert[]>(JSON.parse(JSON.stringify(mockAlerts)))
  const kpiItems = ref<KpiItem[]>(generateKpiItems(mockKpiTemplates, TOTAL_TICKS))
  const logs = ref<LogEntry[]>([])

  function computeStatus(value: number, metric: Metric): MetricStatus {
    if (value >= metric.criticalThreshold) return 'critical'
    if (value >= metric.warningThreshold) return 'warning'
    return 'normal'
  }

  function computeKpiStatus(value: number, item: KpiItem): MetricStatus {
    if (item.lowerIsBetter) {
      if (value <= item.criticalThreshold) return 'critical'
      if (value <= item.warningThreshold) return 'warning'
      return 'normal'
    }
    if (value >= item.criticalThreshold) return 'critical'
    if (value >= item.warningThreshold) return 'warning'
    return 'normal'
  }

  function tickKpis(tick: number) {
    const idx = tick - 1
    for (const item of kpiItems.value) {
      const value = item.script[idx]
      if (value === undefined) continue
      item.value = value
      item.status = computeKpiStatus(value, item)
    }
  }

  function tickToTime(tick: number): string {
    const s = tick
    const m = Math.floor(s / 60)
    const h = Math.floor(m / 60)
    return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
  }

  function tickMetrics(tick: number) {
    const idx = tick - 1
    for (const metrics of Object.values(metricsMap.value)) {
      for (const metric of metrics) {
        const value = metric.script[idx]
        if (value === undefined) continue
        metric.value = value
        metric.history.push(value)
        metric.status = computeStatus(value, metric)
      }
    }
  }

  function pushAlert(tick: number) {
    const time = tickToTime(tick)
    for (const [objectId, metrics] of Object.entries(metricsMap.value)) {
      for (const metric of metrics) {
        if (metric.status === 'normal' || metric.status === null) continue
        const severity = metric.status as 'warning' | 'critical'
        const alreadyFired = alerts.value.some(
          (a) => a.objectId === objectId && a.metric === metric.name && a.severity === severity,
        )
        if (alreadyFired) continue

        const template = mockMetricTemplates[objectId]?.find((t) => t.name === metric.name)
        const description = template
          ? `${severity === 'critical' ? template.criticalMessage : template.warningMessage} (${metric.value} ${template.unit}, threshold: ${severity === 'critical' ? template.criticalThreshold : template.warningThreshold} ${template.unit})`
          : `${metric.name} exceeded ${severity} threshold`

        alerts.value.push({
          objectId,
          metric: metric.name,
          severity,
          triggeredAt: time,
          triggeredValue: metric.value,
          description,
        })
        logs.value.push({
          time,
          level: severity === 'critical' ? 'error' : 'warning',
          message: `[${objectId}] ${description}`,
        })
      }
    }
  }

  function appendLog(tick: number, isComplete: boolean) {
    if (tick === 1) {
      logs.value.unshift({
        time: '00:00:00',
        level: 'info',
        message: 'Simulation started. Monitoring all objects.',
      })
    }
    if (isComplete) {
      logs.value.push({ time: tickToTime(tick), level: 'info', message: 'Simulation completed.' })
    }
  }

  function reset() {
    metricsMap.value = generateMetricsMap(mockMetricTemplates, TOTAL_TICKS)
    alerts.value = JSON.parse(JSON.stringify(mockAlerts))
    kpiItems.value = generateKpiItems(mockKpiTemplates, TOTAL_TICKS)
    logs.value = []
  }

  return {
    metricsMap,
    alerts,
    kpiItems,
    logs,
    tickMetrics,
    tickKpis,
    pushAlert,
    appendLog,
    reset,
  }
})
