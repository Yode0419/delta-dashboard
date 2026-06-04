import type { Experiment, ObjectItem, Metric, Version, Alert, KpiItem } from '@/types'

export const mockExperiment: Experiment = {
  id: 'exp-003',
  name: 'Server Thermal Simulation #003',
  status: 'running',
  progress: 88,
  duration: 754, // 00:12:34 in seconds
}

export const mockObjects: ObjectItem[] = [
  {
    id: 'fan-1',
    name: 'Fan#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v2.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Axial exhaust fan at rear of primary rack. Provides forced convection across the main heat exchange zone.',
  },
  {
    id: 'fan-2',
    name: 'Fan#2',
    status: 'critical',
    alertCount: 2,
    currentVersion: 'v2.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Axial exhaust fan at rear of secondary rack. Paired with Fan#1 for redundant airflow coverage.',
  },
  {
    id: 'heat-sink-1',
    name: 'HeatSink#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Aluminum fin-stack heat sink on CPU socket A. Dissipates processor heat via forced convection from Fan#1.',
  },
  {
    id: 'heat-sink-2',
    name: 'HeatSink#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.1',
    previousVersion: null,
    versionChanged: false,
    description:
      'Aluminum fin-stack heat sink on CPU socket B. Dissipates processor heat via forced convection from Fan#2.',
  },
  {
    id: 'cooler-1',
    name: 'Cooler#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v3.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Closed-loop liquid cooling unit for the primary compute cluster. Circulates coolant between cold plates and the external radiator.',
  },
  {
    id: 'cooler-2',
    name: 'Cooler#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v3.1',
    previousVersion: null,
    versionChanged: false,
    description:
      'Closed-loop liquid cooling unit for the secondary compute cluster. Operates as a redundant cooling path during peak load.',
  },
  {
    id: 'thermal-pad-1',
    name: 'ThermalPad#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v2.2',
    previousVersion: null,
    versionChanged: false,
    description:
      'Thermal interface material between HeatSink#1 and CPU socket A. Reduces contact resistance at the die-to-heatsink junction.',
  },
  {
    id: 'thermal-pad-2',
    name: 'ThermalPad#2',
    status: 'warning',
    alertCount: 1,
    currentVersion: 'v2.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Thermal interface material between HeatSink#2 and CPU socket B. Reduces contact resistance at the die-to-heatsink junction.',
  },
  {
    id: 'server-rack-1',
    name: 'ServerRack#1',
    status: 'critical',
    alertCount: 1,
    currentVersion: 'v1.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'High-density compute rack in bay A, housing 12 server nodes. Rated for up to 150 W/m² continuous power density.',
  },
  {
    id: 'server-rack-2',
    name: 'ServerRack#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.6',
    previousVersion: null,
    versionChanged: false,
    description:
      'High-density compute rack in bay B, housing 12 server nodes. Rated for up to 150 W/m² continuous power density.',
  },
  {
    id: 'chassis-1',
    name: 'Chassis#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.8',
    previousVersion: null,
    versionChanged: false,
    description:
      'ATX server chassis enclosing the nodes in ServerRack#1. Includes integrated cable management and front-panel airflow intake.',
  },
  {
    id: 'chassis-2',
    name: 'Chassis#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.9',
    previousVersion: null,
    versionChanged: false,
    description:
      'ATX server chassis enclosing the nodes in ServerRack#2. Includes integrated cable management and front-panel airflow intake.',
  },
  {
    id: 'motherboard-1',
    name: 'Motherboard#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v4.0',
    previousVersion: null,
    versionChanged: false,
    description:
      'Dual-socket server motherboard in Chassis#1. Supports up to 3 TB DDR5 ECC RAM across 24 DIMM slots.',
  },
  {
    id: 'motherboard-2',
    name: 'Motherboard#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v4.1',
    previousVersion: null,
    versionChanged: false,
    description:
      'Dual-socket server motherboard in Chassis#2. Supports up to 3 TB DDR5 ECC RAM across 24 DIMM slots.',
  },
]

export const mockMetricsMap: Record<string, Metric[]> = {
  'fan-1': [
    {
      name: 'fanSpeed',
      value: 3100,
      unit: 'RPM',
      status: 'normal',
      script: [3100, 3100, 3200, 3150, 3200, 3100, 3150, 3100],
      warningThreshold: 4000,
      criticalThreshold: 4500,
      history: [3100],
    },
    {
      name: 'temperature',
      value: 42,
      unit: '°C',
      status: 'normal',
      script: [40, 41, 42, 42, 43, 42, 43, 42],
      warningThreshold: 62,
      criticalThreshold: 75,
      history: [40, 41, 42, 42, 43, 42],
    },
    {
      name: 'vibration',
      value: 0.8,
      unit: 'mm/s',
      status: 'normal',
      script: [0.7, 0.8, 0.8, 0.9, 0.8, 0.8, 0.9, 0.8],
      warningThreshold: 2.5,
      criticalThreshold: 4.0,
      history: [0.7, 0.8, 0.8, 0.9, 0.8, 0.8],
    },
  ],
  'fan-2': [
    {
      name: 'fanSpeed',
      value: 4800,
      unit: 'RPM',
      status: 'critical',
      script: [3200, 3400, 3800, 4200, 4500, 4800, 4850, 4850],
      warningThreshold: 4000,
      criticalThreshold: 4500,
      history: [3200, 3400, 3800, 4200, 4500, 4800],
    },
    {
      name: 'temperature',
      value: 65,
      unit: '°C',
      status: 'warning',
      script: [45, 50, 55, 60, 63, 65, 67, 68],
      warningThreshold: 62,
      criticalThreshold: 75,
      history: [45, 50, 55, 60, 63, 65],
    },
    {
      name: 'vibration',
      value: 1.1,
      unit: 'mm/s',
      status: 'normal',
      script: [0.9, 1.0, 1.0, 1.1, 1.1, 1.1, 1.2, 1.2],
      warningThreshold: 2.5,
      criticalThreshold: 4.0,
      history: [0.9, 1.0, 1.0, 1.1, 1.1, 1.1],
    },
  ],
  'thermal-pad-2': [
    {
      name: 'thermalResistance',
      value: 1.15,
      unit: '°C/W',
      status: 'warning',
      script: [0.8, 0.9, 1.0, 1.1, 1.15, 1.2, 1.2, 1.2],
      warningThreshold: 1.1,
      criticalThreshold: 1.5,
      history: [0.8, 0.9, 1.0, 1.1, 1.15],
    },
  ],
  'server-rack-1': [
    {
      name: 'powerDensity',
      value: 180,
      unit: 'W/m²',
      status: 'critical',
      script: [120, 130, 145, 160, 170, 180, 185, 190],
      warningThreshold: 155,
      criticalThreshold: 175,
      history: [120, 130, 145, 160, 170, 180],
    },
  ],
}

export const mockVersionsMap: Record<string, Version[]> = {
  'fan-2': [
    {
      id: 'v1.0',
      label: 'v1.0',
      createdAt: '2026-01-10',
      description: 'Initial release',
      isCurrent: false,
      isLastRun: false,
    },
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-03-22',
      description: 'Improved blade geometry',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v3.0',
      label: 'v3.0',
      createdAt: '2026-06-01',
      description: 'High-efficiency motor',
      isCurrent: false,
      isLastRun: false,
    },
  ],
  'server-rack-1': [
    {
      id: 'v1.0',
      label: 'v1.0',
      createdAt: '2026-02-01',
      description: 'Initial build',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v1.4',
      label: 'v1.4',
      createdAt: '2026-04-18',
      description: 'Airflow baffles added',
      isCurrent: false,
      isLastRun: false,
    },
    {
      id: 'v1.5',
      label: 'v1.5',
      createdAt: '2026-05-20',
      description: 'Cable management update',
      isCurrent: false,
      isLastRun: false,
    },
  ],
  'thermal-pad-2': [
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-03-10',
      description: 'Standard graphite pad',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v2.3',
      label: 'v2.3',
      createdAt: '2026-05-28',
      description: 'Phase-change material',
      isCurrent: false,
      isLastRun: false,
    },
  ],
}

export const mockAlerts: Alert[] = [
  {
    objectId: 'fan-2',
    metric: 'fanSpeed',
    severity: 'warning',
    triggeredAt: '00:08',
    triggeredValue: 4200,
    description: 'Fan speed exceeded warning threshold (4000 RPM)',
  },
  {
    objectId: 'fan-2',
    metric: 'fanSpeed',
    severity: 'critical',
    triggeredAt: '00:10',
    triggeredValue: 4800,
    description: 'Fan speed exceeded critical threshold (4500 RPM)',
  },
  {
    objectId: 'fan-2',
    metric: 'temperature',
    severity: 'warning',
    triggeredAt: '00:08',
    triggeredValue: 63,
    description: 'Temperature exceeded warning threshold (62 °C)',
  },
  {
    objectId: 'server-rack-1',
    metric: 'powerDensity',
    severity: 'critical',
    triggeredAt: '00:10',
    triggeredValue: 180,
    description: 'Power density exceeded critical threshold (175 W/m²)',
  },
  {
    objectId: 'thermal-pad-2',
    metric: 'thermalResistance',
    severity: 'warning',
    triggeredAt: '00:08',
    triggeredValue: 1.15,
    description: 'Thermal resistance exceeded warning threshold (1.1 °C/W)',
  },
]

export const mockKpiItems: KpiItem[] = [
  { label: 'Peak Temp', value: 94, unit: '°C', status: 'critical' },
  { label: 'Avg Fan Speed', value: 3200, unit: 'RPM', status: 'warning' },
  { label: 'Total Power', value: 340, unit: 'W', status: 'normal' },
  { label: 'Avg Efficiency', value: 87, unit: '%', status: 'normal' },
]
