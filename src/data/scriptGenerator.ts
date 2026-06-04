import type { Metric, KpiItem } from '@/types'
import type { MetricTemplate } from '@/data/mockMetricTemplates'
import type { KpiTemplate } from '@/data/mockKpi'

function generateScript(
  t: { baseValue: number; driftPerTick: number; noiseRange: number },
  ticks: number,
): number[] {
  const out = [t.baseValue]
  for (let i = 1; i < ticks; i++) {
    const prev = out[i - 1] ?? t.baseValue
    const noise = (Math.random() * 2 - 1) * t.noiseRange
    out.push(Math.round((prev + t.driftPerTick + noise) * 10) / 10)
  }
  return out
}

export function generateMetricsMap(
  templates: Record<string, MetricTemplate[]>,
  ticks: number,
): Record<string, Metric[]> {
  const result: Record<string, Metric[]> = {}
  for (const [id, list] of Object.entries(templates)) {
    result[id] = list.map((t) => {
      const script = generateScript(t, ticks)
      return {
        name: t.name,
        unit: t.unit,
        value: script[0] ?? t.baseValue,
        status: null,
        script,
        history: [],
        warningThreshold: t.warningThreshold,
        criticalThreshold: t.criticalThreshold,
      }
    })
  }
  return result
}

export function generateKpiItems(templates: KpiTemplate[], ticks: number): KpiItem[] {
  return templates.map((t) => {
    const script = generateScript(t, ticks)
    return {
      label: t.label,
      unit: t.unit,
      value: null,
      status: null,
      script,
      warningThreshold: t.warningThreshold,
      criticalThreshold: t.criticalThreshold,
      lowerIsBetter: t.lowerIsBetter ?? false,
    }
  })
}
