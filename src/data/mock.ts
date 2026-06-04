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
  },
  {
    id: 'fan-2',
    name: 'Fan#2',
    status: 'critical',
    alertCount: 2,
    currentVersion: 'v2.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'heat-sink-1',
    name: 'HeatSink#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'heat-sink-2',
    name: 'HeatSink#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.1',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'cooler-1',
    name: 'Cooler#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v3.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'cooler-2',
    name: 'Cooler#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v3.1',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'thermal-pad-1',
    name: 'ThermalPad#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v2.2',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'thermal-pad-2',
    name: 'ThermalPad#2',
    status: 'warning',
    alertCount: 1,
    currentVersion: 'v2.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'server-rack-1',
    name: 'ServerRack#1',
    status: 'critical',
    alertCount: 1,
    currentVersion: 'v1.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'server-rack-2',
    name: 'ServerRack#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.6',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'chassis-1',
    name: 'Chassis#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.8',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'chassis-2',
    name: 'Chassis#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v1.9',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'motherboard-1',
    name: 'Motherboard#1',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v4.0',
    previousVersion: null,
    versionChanged: false,
  },
  {
    id: 'motherboard-2',
    name: 'Motherboard#2',
    status: 'normal',
    alertCount: 0,
    currentVersion: 'v4.1',
    previousVersion: null,
    versionChanged: false,
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
  'fan-1': [
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-03-22',
      description:
        'Axial exhaust fan at rear of primary rack with redesigned blade profile. Nominal speed 3500 RPM, power draw 24 W, noise level 45 dBA at full load.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'fan-2': [
    {
      id: 'v1.0',
      label: 'v1.0',
      createdAt: '2026-01-10',
      description:
        'Standard axial fan with brushed motor. Rated at 3200 RPM nominal speed, 28 W power draw, and 50 dBA noise level at full load.',
      isCurrent: false,
      isLastRun: false,
    },
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-03-22',
      description:
        'Axial fan with redesigned blade profile for improved aerodynamic efficiency. Rated at 3500 RPM nominal, 24 W power draw, and reduced noise signature of 45 dBA.',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v3.0',
      label: 'v3.0',
      createdAt: '2026-06-01',
      description:
        'Brushless EC motor with optimized rotor geometry for low-vibration operation. Rated at 4000 RPM nominal, 22 W power draw, and extended MTBF of 80,000 hours.',
      isCurrent: false,
      isLastRun: false,
    },
  ],
  'server-rack-1': [
    {
      id: 'v1.0',
      label: 'v1.0',
      createdAt: '2026-02-01',
      description:
        'Standard 42U rack enclosure with passive cable routing. Houses 12 high-density compute nodes in a front-to-rear airflow configuration.',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v1.4',
      label: 'v1.4',
      createdAt: '2026-04-18',
      description:
        'Front-to-rear airflow baffles installed to eliminate hot-air recirculation. Estimated 8% improvement in thermal uniformity across all node slots.',
      isCurrent: false,
      isLastRun: false,
    },
    {
      id: 'v1.5',
      label: 'v1.5',
      createdAt: '2026-05-20',
      description:
        'Structured cabling system with labeled patch panels. Reduces installation time and improves serviceability without altering thermal configuration.',
      isCurrent: false,
      isLastRun: false,
    },
  ],
  'thermal-pad-2': [
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-03-10',
      description:
        'Standard 0.5 mm graphite thermal pad with thermal conductivity of 6 W/m·K. Suitable for steady-state loads up to 80°C junction temperature.',
      isCurrent: true,
      isLastRun: true,
    },
    {
      id: 'v2.3',
      label: 'v2.3',
      createdAt: '2026-05-28',
      description:
        'Phase-change material pad rated at 10 W/m·K, transitioning to liquid phase at 52°C for improved surface conformance. Designed for high-power transient workloads.',
      isCurrent: false,
      isLastRun: false,
    },
  ],
  'heat-sink-1': [
    {
      id: 'v1.0',
      label: 'v1.0',
      createdAt: '2025-11-05',
      description:
        'Aluminum fin-stack heat sink on CPU socket A. Dissipates processor heat via forced convection from Fan#1, rated for up to 150 W TDP.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'heat-sink-2': [
    {
      id: 'v1.1',
      label: 'v1.1',
      createdAt: '2026-01-18',
      description:
        'Aluminum fin-stack heat sink on CPU socket B with increased fin density over v1.0. Rated for up to 165 W TDP under nominal Fan#2 airflow.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'cooler-1': [
    {
      id: 'v3.0',
      label: 'v3.0',
      createdAt: '2026-02-14',
      description:
        'Closed-loop liquid cooling unit for the primary compute cluster. Dual-pump configuration circulates coolant between cold plates and the external radiator at 2 L/min.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'cooler-2': [
    {
      id: 'v3.1',
      label: 'v3.1',
      createdAt: '2026-03-01',
      description:
        'Closed-loop liquid cooling unit for the secondary compute cluster with improved radiator surface area. Provides 15% higher heat rejection capacity than v3.0.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'thermal-pad-1': [
    {
      id: 'v2.2',
      label: 'v2.2',
      createdAt: '2026-02-28',
      description:
        'Enhanced graphite composite pad with thermal conductivity of 8 W/m·K between HeatSink#1 and CPU socket A. Reduces contact resistance under sustained load.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'server-rack-2': [
    {
      id: 'v1.6',
      label: 'v1.6',
      createdAt: '2026-04-30',
      description:
        '42U rack enclosure in bay B with integrated structured cabling. Houses 12 server nodes with front-to-rear airflow and improved cable routing for reduced airflow restriction.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'chassis-1': [
    {
      id: 'v1.8',
      label: 'v1.8',
      createdAt: '2026-03-15',
      description:
        'ATX server chassis enclosing the nodes in ServerRack#1. Reinforced mounting rails support up to 30 kg per shelf, with integrated front-panel airflow intake.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'chassis-2': [
    {
      id: 'v1.9',
      label: 'v1.9',
      createdAt: '2026-04-10',
      description:
        'ATX server chassis enclosing the nodes in ServerRack#2. Updated airflow baffles minimize recirculation at the rear exhaust zone, improving effective cooling by approximately 6%.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'motherboard-1': [
    {
      id: 'v4.0',
      label: 'v4.0',
      createdAt: '2026-01-20',
      description:
        'Dual-socket server motherboard in Chassis#1. Supports up to 3 TB DDR5 ECC RAM across 24 DIMM slots, with 8 PCIe 4.0 x16 expansion lanes per socket.',
      isCurrent: true,
      isLastRun: true,
    },
  ],
  'motherboard-2': [
    {
      id: 'v4.1',
      label: 'v4.1',
      createdAt: '2026-02-05',
      description:
        'Dual-socket server motherboard in Chassis#2 with PCIe 5.0 support. Provides 2× bandwidth for NVMe storage controllers compared to v4.0, with the same 3 TB DDR5 memory capacity.',
      isCurrent: true,
      isLastRun: true,
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
