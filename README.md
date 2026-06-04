# Delta Dashboard

An interactive Vue 3 prototype built for a Delta Electronics UIUX Engineer interview. Based on a completed Figma design, the goal is to demonstrate design-to-frontend capability with a working simulation engine and full object version-swap flow.

**Figma Design:** https://www.figma.com/design/yKyKVcdDzVGrTWKFqAl1QL/Delta-Assignment---yode?node-id=141-1116

## Core Features

- **Simulation engine** — a time-series playbook runs on a 2-second tick interval, updating metrics in real time over ~16 seconds
- **Automatic alert triggering** — metrics crossing warning/critical thresholds fire alerts at predetermined ticks
- **Object version-swap flow** — Stop → Change Version → Apply → Revert, with visual indicators throughout
- **Service layer** — all data access goes through `experimentService.ts` (async with simulated delay), keeping UI components decoupled from mock data

## Tech Stack

| | |
|---|---|
| Framework | Vue 3 + Composition API |
| Language | TypeScript |
| Build | Vite |
| UI Library | Element Plus |
| State | Pinia |
| Charts | Hand-crafted SVG (no library) |

## Quick Start

```bash
npm install
npm run dev
```

```bash
npm run build   # type-check + build
npm run lint    # oxlint then eslint, both with --fix
```

## Demo Script

1. Open the app — experiment starts in **Running** state with a live timer and progress bar
2. Watch metrics update every ~2 seconds; Fan#2 and ServerRack#1 escalate to Warning → Critical automatically
3. Click any object to see its metrics, sparkline charts, and alert descriptions in the detail panel
4. Click **Stop** → then **Change Version** on an object to open the version modal
5. Select a version and **Apply** — the object list shows a dot indicator, detail panel shows empty state
6. Click **Revert** to roll back, or **Re-run** to restart the simulation from the beginning

## Project Structure

```
src/
├── types/index.ts                 # TypeScript interfaces
├── data/mock.ts                   # time-series playbook data
├── services/experimentService.ts  # async API simulation
├── stores/experiment.ts           # Pinia store
├── composables/useSimulation.ts   # tick-driven simulation engine
└── components/                    # UI components
```
