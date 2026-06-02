# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Background

A Vue 3 interactive prototype for a Delta Electronics UIUX Engineer interview. The Figma design is complete; the goal is to implement a dashboard that demonstrates design-to-frontend capability. See [planning/prototype-plan.md](planning/prototype-plan.md) for the full development plan.

Key demo goals: simulation engine (time-series playbook), automatic alert triggering, object version-swap flow, and service-layer architecture.

## Commands

```bash
npm run dev        # start dev server
npm run build      # type-check + build
npm run lint       # oxlint then eslint (both run with --fix)
```

Linting runs in two layers: `oxlint` (fast) first, then `eslint`. Rules are kept in sync via `eslint-plugin-oxlint` to prevent conflicts.

## Architecture

```
src/
├── types/index.ts                 # all TypeScript interfaces and types
├── data/mock.ts                   # static time-series playbook data
├── services/experimentService.ts  # async API simulation (delay + return mock)
├── stores/experiment.ts           # Pinia store — experiment state, selected object, version ops
├── composables/useSimulation.ts   # simulation engine — setInterval tick driver
└── components/                    # UI components; fetch data only via service layer
```

`@` alias maps to `src/` (configured in `vite.config.ts`).

## Key Design Principles

**Service layer isolation**: Components never import `data/mock.ts` directly. All data access goes through `services/experimentService.ts`, which wraps each call in `await delay(300–500ms)` before returning mock data. This intentionally demonstrates UI/data separation.

**Simulation engine**: `composables/useSimulation.ts` drives a `setInterval` at 2000ms/tick for 8 total ticks (~16 seconds). Each tick updates metrics, checks thresholds to fire alerts, aggregates object status, appends a log entry, and advances progress. Reaching `totalTicks` auto-completes the experiment.

**Sparkline**: Hand-crafted SVG in `SparklineChart.vue`. Accepts `number[]` and renders a polyline with a dashed threshold line — no chart library dependency.

## TypeScript Interfaces (`src/types/index.ts`)

```ts
type ExperimentStatus = 'running' | 'completed' | 'stopped'
type MetricStatus = 'normal' | 'warning' | 'critical'

interface Metric {
  script: number[]       // full time-series playbook
  history: number[]      // values played so far (backs the sparkline)
  warningThreshold: number
  criticalThreshold: number
}
```

## Mock Data — Alert Trigger Timing

| Object | Metric | warning threshold | warning tick | critical threshold | critical tick |
|--------|--------|-------------------|--------------|--------------------|---------------|
| Fan#2 | fanSpeed | 4000 | 4 | 4500 | 5 |
| Fan#2 | temperature | 62 | 4 | 75 | — |
| ServerRack#1 | powerDensity | 155 | 3 | 175 | 5 |
| ThermalPad#2 | thermalResistance | 1.1 | 4 | — | — |
