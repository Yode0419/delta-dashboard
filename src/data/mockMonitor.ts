import type { Version, Alert } from '@/types'

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
    {
      id: 'v2.1',
      label: 'v2.1',
      createdAt: '2026-05-10',
      description:
        'Revised v2.0 blade geometry for reduced turbulence noise. Nominal speed unchanged at 3500 RPM; acoustic signature reduced by 3 dBA at full load with no change in airflow performance.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v1.1',
      label: 'v1.1',
      createdAt: '2026-04-12',
      description:
        'Copper base plate added to v1.0 aluminum fin stack, improving spreading resistance by approximately 15%. Rated for up to 175 W TDP under the same Fan#1 airflow.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v1.2',
      label: 'v1.2',
      createdAt: '2026-05-03',
      description:
        'Vapor chamber base replaces solid copper plate for improved heat spreading under non-uniform die power maps. Rated for up to 200 W TDP with reduced hot-spot temperature delta.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v3.1',
      label: 'v3.1',
      createdAt: '2026-05-20',
      description:
        'Upgraded pump impeller geometry increases nominal flow rate from 2 L/min to 2.6 L/min, reducing coolant delta-T by approximately 12% under peak compute load.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v3.2',
      label: 'v3.2',
      createdAt: '2026-05-28',
      description:
        'Microchannel radiator replaces brazed aluminum core for a 22% improvement in heat rejection per unit volume. Compatible with existing fittings and pump assembly from v3.1.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v2.3',
      label: 'v2.3',
      createdAt: '2026-05-15',
      description:
        'Phase-change material pad rated at 10 W/m·K, transitioning to liquid phase at 52°C for improved surface conformance. Designed for sustained high-power workloads above 120 W.',
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
    {
      id: 'v1.7',
      label: 'v1.7',
      createdAt: '2026-05-25',
      description:
        'Hot-swap drive bays added to all 12 node slots. Enables storage replacement without rack power-down; airflow baffle geometry unchanged from v1.6.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v1.9',
      label: 'v1.9',
      createdAt: '2026-05-18',
      description:
        'Cable management arm and rear routing guides added to v1.8 chassis. Reduces cable obstruction in exhaust zone, improving effective rear airflow by approximately 5%.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v2.0',
      label: 'v2.0',
      createdAt: '2026-06-01',
      description:
        'Full chassis redesign with tool-less drive sleds and a 40 mm wider exhaust plenum. Thermal simulation predicts 9% reduction in average node inlet temperature under peak load.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v4.1',
      label: 'v4.1',
      createdAt: '2026-05-12',
      description:
        'PCIe 5.0 lanes added to all expansion slots, doubling storage controller bandwidth over v4.0. VRM layout revised for improved thermal headroom at sustained full-socket TDP.',
      isCurrent: false,
      isLastRun: false,
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
    {
      id: 'v4.2',
      label: 'v4.2',
      createdAt: '2026-05-30',
      description:
        'Enhanced 16-phase power delivery network with digital PWM controllers. Reduces VRM operating temperature by up to 8°C at peak load compared to v4.1.',
      isCurrent: false,
      isLastRun: false,
    },
  ],
}

export const mockAlerts: Alert[] = []
