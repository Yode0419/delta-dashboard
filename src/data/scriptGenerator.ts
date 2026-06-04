import type { Metric } from '@/types'
import type { MetricTemplate } from '@/data/mockMetricTemplates'

export function generateScript(t: MetricTemplate, ticks: number): number[] {
  const out = [t.baseValue]
  for (let i = 1; i < ticks; i++) {
    const prev = out[i - 1] ?? t.baseValue
    const noise = (Math.random() * 2 - 1) * t.noiseRange
    out.push(Math.round((prev + t.driftPerTick + noise) * 100) / 100)
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
