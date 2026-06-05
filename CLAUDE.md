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

Linting runs two layers: `oxlint` (fast) first, then `eslint`. Rules are kept in sync via `eslint-plugin-oxlint` to prevent conflicts.

## Architecture

```
src/
├── types/index.ts                       # all TypeScript interfaces and types
├── data/
│   ├── simulationConfig.ts              # TOTAL_TICKS=20, TICK_INTERVAL_MS=500
│   ├── scriptGenerator.ts               # generates metric/kpi scripts from templates (noise + drift)
│   ├── mockMetricTemplates.ts           # MetricTemplate[] per object — baseValue, driftPerTick, noiseRange, thresholds
│   ├── mockKpi.ts                       # KpiTemplate[] for top-level KPI cards
│   ├── mockExperiment.ts / mockObjects.ts / mockMonitor.ts  # static seed data
│   └── mock.ts                          # re-exports all mock data
├── services/experimentService.ts        # async API simulation (delay + return mock); subscribeToExperimentStream
├── stores/
│   ├── experiment.ts                    # Experiment status, progress, duration
│   ├── monitor.ts                       # metricsMap, alerts, kpiItems, logs — tick mutations
│   ├── object.ts                        # objects list, selectedObjectId, version-change state
│   └── version.ts                       # versionsMap per object, saved pre-swap state
├── composables/
│   ├── useExperimentStream.ts           # singleton stream subscription; dispatches ticks to stores
│   └── useExperimentSession.ts          # cross-store derived state + business actions (stop/rerun/version ops)
└── components/                          # UI components; never import data/mock.ts directly
```

`@` alias maps to `src/` (configured in `vite.config.ts`).

## Key Design Principles

**Service layer isolation**: Components never import `data/mock.ts` directly. All data access goes through `services/experimentService.ts`, which wraps each call in `await delay(300–500ms)` before returning mock data.

**Simulation stream**: `useExperimentStream` is a module-level singleton. It calls `subscribeToExperimentStream` which drives a `setInterval` at `TICK_INTERVAL_MS` (500ms) for `TOTAL_TICKS` (20) ticks (~10 seconds). Each tick dispatches to `monitorStore.tickMetrics`, `tickKpis`, `pushAlert`, `appendLog`, and `objectStore.updateAllStatusFromMetrics`. Reaching the last tick calls `onComplete` and auto-completes the experiment.

**Script generation**: Metric and KPI scripts are generated at store init (and on reset) by `scriptGenerator.ts` using `baseValue + driftPerTick + noise` per tick — not hardcoded arrays. Alert timing is therefore probabilistic, not fixed.

**Store separation**: Each store owns one concern. Cross-store derived state and multi-store actions live in `useExperimentSession` (the facade composable that components should use).

**Version swap flow**: `applyVersion` in `useExperimentSession` — saves pre-swap `{alertCount, status}` to `versionStore`, calls `objectStore.markVersionChanged` (zeroes alerts, shows neutral state), calls API fire-and-forget. `revertVersion` restores the saved state and calls `objectStore.unmarkVersionChanged`. Only allowed when experiment is not running.

## TypeScript Interfaces (`src/types/index.ts`)

```ts
type ExperimentStatus = 'running' | 'completed' | 'stopped'
type MetricStatus = 'normal' | 'warning' | 'critical'

interface Metric {
  script: number[]       // full generated time-series
  history: number[]      // values played so far (backs the sparkline)
  warningThreshold: number
  criticalThreshold: number
  value: number | null   // current tick value
  status: MetricStatus | null
}

interface KpiItem {
  lowerIsBetter: boolean  // inverts threshold direction (e.g. latency)
}
```
