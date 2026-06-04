export interface KpiTemplate {
  label: string
  unit: string
  baseValue: number
  driftPerTick: number
  noiseRange: number
  warningThreshold: number
  criticalThreshold: number
  lowerIsBetter?: boolean
}

export const mockKpiTemplates: KpiTemplate[] = [
  {
    label: 'Peak Temp',
    unit: '°C',
    baseValue: 67,
    driftPerTick: 0.85,
    noiseRange: 1.5,
    warningThreshold: 80,
    criticalThreshold: 90,
  },
  {
    label: 'Avg Fan Speed',
    unit: 'RPM',
    baseValue: 3150,
    driftPerTick: 70,
    noiseRange: 50,
    warningThreshold: 4000,
    criticalThreshold: 4500,
  },
  {
    label: 'Total Power',
    unit: 'W',
    baseValue: 365,
    driftPerTick: 3,
    noiseRange: 5,
    warningThreshold: 395,
    criticalThreshold: 420,
  },
  {
    label: 'Avg Efficiency',
    unit: '%',
    baseValue: 92,
    driftPerTick: -0.28,
    noiseRange: 0.4,
    warningThreshold: 88,
    criticalThreshold: 84,
    lowerIsBetter: true,
  },
]
