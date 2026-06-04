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
  status: MetricStatus
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
  value: number
  unit: string
  status: MetricStatus
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
  value: number
  unit: string
  status: MetricStatus
}

export interface LogEntry {
  time: string
  level: 'info' | 'warning' | 'error'
  message: string
}
