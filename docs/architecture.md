# Delta Dashboard 架構說明

Vue 3 · TypeScript · Vite · Pinia · Element Plus

---

## 分層架構概覽

```
┌─────────────────────────────────────────────────────────┐
│  UI COMPONENTS  (Vue SFCs)                              │
│  App Shell │ Dashboard Views │ Detail Panel             │
├─────────────────────────────────────────────────────────┤
│  COMPOSABLES  (業務邏輯)                                 │
│  useExperimentStream │ useExperimentSession             │
├─────────────────────────────────────────────────────────┤
│  PINIA STORES  (響應式狀態)                              │
│  experiment │ object │ monitor │ version                │
├─────────────────────────────────────────────────────────┤
│  SERVICE LAYER  (API 模擬)                               │
│  experimentService.ts                                   │
├─────────────────────────────────────────────────────────┤
│  MOCK DATA  (靜態資料)                                   │
│  mockExperiment │ mockObjects │ mockMonitor │ ...       │
└─────────────────────────────────────────────────────────┘
```

---

## 各層職責

### UI Components

元件只負責呈現，不直接讀取 mock 資料，所有資料透過 service 層取得。

| 群組 | 元件 |
|------|------|
| App Shell | `App.vue`、`AppHeader`、`AppSidebar` |
| Dashboard Views | `ObjectsPanel`、`ObjectList`、`HeatmapPanel`、`KpiCard`、`LogPanel`、`StatusCell` |
| Detail Panel | `ObjectDetail`、`MetricCard`、`SparklineChart`、`ChangeVersionDialog` |

> `SparklineChart.vue` 使用 `vue-chartjs` + `chart.js`，含 warning / critical 虛線 threshold。

---

### Composables

封裝跨 store 的業務邏輯，元件只需呼叫 composable，不直接操作 store。

**`useExperimentStream`**
- 管理 SSE-like 串流訂閱（module-level singleton，避免重複 subscribe）
- 每個 tick 依序觸發：metrics → KPIs → alerts → logs → objects → progress
- 監聽 `experimentStore.status`，自動在 re-run 時重新啟動串流

**`useExperimentSession`**
- 跨 store 的衍生狀態（selectedMetrics、selectedAlerts、selectedVersions）
- 版本操作：`applyVersion` / `revertVersion`（optimistic update，fire & forget）
- 實驗控制：`stopExperiment` / `rerun`

---

### Pinia Stores

| Store | 負責狀態 | 主要 actions |
|-------|---------|-------------|
| `experimentStore` | status、progress、duration | `hydrate`、`stop`、`complete`、`reset` |
| `objectStore` | objects 清單、selectedObjectId | `markVersionChanged`、`updateAllStatusFromMetrics` |
| `monitorStore` | metricsMap、alerts、kpis、logs | `tickMetrics`、`tickKpis`、`pushAlert`、`appendLog` |
| `versionStore` | versionsMap、saved states | `setCurrentVersion`、`saveState`、`clearState` |

---

### Service Layer

`src/services/experimentService.ts` — 所有元件的唯一資料入口。

**REST stubs**（每個都包在 `await delay(300–1000ms)` 內，模擬網路延遲）

```
fetchExperiment()     fetchObjects()      fetchVersionsMap()
stopExperiment()      rerunExperiment()
applyVersion()        revertVersion()
```

**SSE-like 串流**

```
subscribeToExperimentStream({ onTick, onComplete })
  └─ setInterval(2000ms) × 8 ticks ≈ 16 秒一輪
  └─ 回傳 unsubscribe() 清理函式
```

---

### Mock Data

| 檔案 | 內容 |
|------|------|
| `mockExperiment.ts` | 實驗初始種子資料 |
| `mockObjects.ts` | Fan#1、Fan#2、ServerRack#1、ThermalPad#2 |
| `mockMonitor.ts` | metricsMap（含 script[]）、versionsMap |
| `mockKpi.ts` | KPI 時序腳本 |
| `mockMetricTemplates.ts` | 指標模板，供 scriptGenerator 使用 |
| `simulationConfig.ts` | `TICK_INTERVAL_MS = 2000`、`TOTAL_TICKS = 8` |
| `scriptGenerator.ts` | `generateMetricScript()` 產生 threshold-aware 時序資料 |

---

## Alert 觸發時序

| 物件 | 指標 | warning 閾值 | warning tick | critical 閾值 | critical tick |
|------|------|-------------|-------------|--------------|--------------|
| Fan#2 | fanSpeed | 4000 | 4 | 4500 | 5 |
| Fan#2 | temperature | 62 | 4 | 75 | — |
| ServerRack#1 | powerDensity | 155 | 3 | 175 | 5 |
| ThermalPad#2 | thermalResistance | 1.1 | 4 | — | — |

---

## TypeScript 型別（`src/types/index.ts`）

```ts
type ExperimentStatus = 'running' | 'completed' | 'stopped'
type MetricStatus     = 'normal'  | 'warning'   | 'critical'

interface Metric {
  script:            number[]  // 完整時序腳本
  history:           number[]  // 已播放值（sparkline 資料來源）
  warningThreshold:  number
  criticalThreshold: number
}
```

其餘介面：`Experiment`、`ObjectItem`、`Version`、`Alert`、`KpiItem`、`LogEntry`

---

## 關鍵設計原則

1. **Service 層隔離** — 元件不可直接 import `data/mock.ts`，一律走 `experimentService`
2. **Optimistic update** — 所有 mutation（stop、applyVersion 等）為 fire & forget，UI 狀態先行更新
3. **Singleton stream** — `useExperimentStream` 用 module-level 變數確保同一時間只有一個 `setInterval`
4. **圖表套件** — `SparklineChart.vue` 以 `vue-chartjs` + `chart.js` 繪製，含 warning / critical 兩條虛線
