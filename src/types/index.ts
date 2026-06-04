export type ExperimentStatus = 'running' | 'completed' | 'stopped'
export type MetricStatus = 'normal' | 'warning' | 'critical'

export interface Experiment {
  id: string
  name: string
  status: ExperimentStatus
  progress: number
  duration: number
}

export interface ObjectItem {
  id: string
  name: string
  status: MetricStatus | null
  alertCount: number
  currentVersion: string
  previousVersion: string | null
  versionChanged: boolean
}

export interface Version {
  id: string
  label: string
  createdAt: string
  description: string
  isCurrent: boolean
  isLastRun: boolean
}

export interface Metric {
  name: string
  label: string
  value: number | null
  unit: string
  status: MetricStatus | null
  script: number[]
  warningThreshold: number
  criticalThreshold: number
  history: number[]
}

export interface Alert {
  objectId: string
  metric: string
  severity: 'warning' | 'critical'
  triggeredAt: string
  triggeredValue: number
  description: string
}

export interface KpiItem {
  label: string
  value: number | null
  unit: string
  status: MetricStatus | null
  script: number[]
  warningThreshold: number
  criticalThreshold: number
  lowerIsBetter: boolean
}

export interface LogEntry {
  time: string
  level: 'info' | 'warning' | 'error'
  message: string
}
