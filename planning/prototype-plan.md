# Sim Monitor Dashboard — Vue 3 Prototype 開發計畫

## Context

**個人 UIUX 設計練習**的延伸開發。設計稿已完成（Figma），目標是將 dashboard wireframe 實作為可互動的 Vue 3 prototype，用以展示設計到前端開發的銜接能力。

**開發時程有限**，開發以「核心流程可完整演示」為優先，不追求完美，視時間能做多少算多少。開發過程需要 AI 輔助。

**核心展示目標：**
- Running 狀態下的模擬引擎（時間序列劇本、即時數據更新）
- Alert 自動觸發（metric 超過 threshold）
- Object 版本更換完整流程
- Service 層架構（非直接 import mock，體現 UI 與資料層分離）

---

## 技術選型

| 項目 | 選擇 | 理由 |
|------|------|------|
| 框架 | Vue 3 + Composition API | 目標職位技術棧 |
| 語言 | TypeScript | 展示型別意識，interface 定義資料結構 |
| 建置工具 | Vite | 標準 Vue 3 開發環境 |
| UI Library | Element Plus | 常見企業內部系統使用，省去元件樣式刻制時間 |
| 狀態管理 | Pinia | Vue 3 標準選擇，結構清晰易解釋 |
| Sparkline | SVG 手刻 | 需求簡單，展示基礎 SVG 知識，無額外依賴 |

**安裝指令：**
```bash
npm create vite@latest sim-monitor-dashboard -- --template vue-ts
cd sim-monitor-dashboard
npm install element-plus pinia
npm install -D @types/node
```

---

## 專案架構

```
sim-monitor-dashboard/
├── src/
│   ├── types/
│   │   └── index.ts              # 所有 TypeScript interface 定義
│   ├── data/
│   │   └── mock.ts               # 靜態假資料（時間序列劇本、objects、versions、logs）
│   ├── services/
│   │   └── experimentService.ts  # async 函式模擬 API（delay + return mock）
│   ├── stores/
│   │   └── experiment.ts         # Pinia store：實驗狀態、選中 object、版本操作
│   ├── composables/
│   │   └── useSimulation.ts      # 模擬引擎：tick 推進、pause/resume/reset
│   ├── components/
│   │   ├── AppSidebar.vue        # 左側 icon nav（裝飾用）
│   │   ├── AppHeader.vue         # 實驗名稱、Status、Duration、Stop/Re-run、進度條
│   │   ├── HeatmapPanel.vue      # 靜態 heatmap 圖片 + 4 個 KPI metric 卡片
│   │   ├── ObjectList.vue        # 表格：Object / Status / Alert / Version，點擊切換
│   │   ├── ObjectDetail.vue      # 右欄：Object 資訊 + MetricCard 列表 + 空狀態
│   │   ├── MetricCard.vue        # 單一 metric：數值、status、sparkline SVG、alert 描述
│   │   ├── SparklineChart.vue    # SVG 折線圖元件，接收 number[] 畫折線與 threshold 線
│   │   ├── ChangeVersionModal.vue # El-Dialog：版本列表（Current/Last Run 標籤）+ Apply
│   │   └── LogPanel.vue          # 底部：隨 tick 追加的 log 列表
│   ├── App.vue                   # 三欄佈局組裝，載入資料
│   └── main.ts                   # Element Plus 註冊、Pinia 初始化
```

---

## 資料結構（TypeScript interfaces）

```ts
// types/index.ts

type ExperimentStatus = 'running' | 'completed' | 'stopped'
type MetricStatus = 'normal' | 'warning' | 'critical'

interface Experiment {
  id: string
  name: string
  status: ExperimentStatus
  progress: number       // 0–100
}

interface ObjectItem {
  id: string
  name: string
  status: MetricStatus
  alertCount: number
  currentVersion: string
  previousVersion: string | null
  versionChanged: boolean
  description: string
}

interface Version {
  id: string
  label: string
  createdAt: string
  description: string
  isCurrent: boolean
  isLastRun: boolean
}

interface Metric {
  name: string
  value: number           // 當前顯示值（由 simulation tick 驅動）
  unit: string
  status: MetricStatus
  script: number[]        // 完整時間序列劇本
  warningThreshold: number
  criticalThreshold: number
  history: number[]       // 已播放的值（backing sparkline）
}

interface Alert {
  metricName: string
  severity: 'warning' | 'critical'
  value: number
  description: string
  timestamp: string
}

interface LogEntry {
  time: string
  level: 'info' | 'warning' | 'error'
  message: string
}
```

---

## Service 層設計

```ts
// services/experimentService.ts
// 元件只呼叫 service，不直接 import mock

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function fetchExperiment(id: string): Promise<Experiment>
export async function fetchObjects(experimentId: string): Promise<ObjectItem[]>
export async function fetchVersions(objectId: string): Promise<Version[]>
export async function fetchMetrics(objectId: string): Promise<Metric[]>
export async function applyVersion(objectId: string, versionId: string): Promise<void>
export async function revertVersion(objectId: string): Promise<void>
```

每個函式：await delay(300–500ms) → return mock data。

---

## 模擬引擎設計（useSimulation.ts）

```ts
// composables/useSimulation.ts

const TICK_INTERVAL_MS = 2000   // 每 2 秒推進一格

function tick() {
  currentTick.value++

  // 1. 更新所有 object 的 metrics 到當前 tick 的值
  // 2. 比對 threshold，若超標且尚未觸發 → push alert
  // 3. 更新 object 的 status（聚合所有 metric status）
  // 4. 追加 log 一行
  // 5. 更新 progress（currentTick / totalTicks * 100）
  // 6. 若 currentTick >= totalTicks → 自動 complete
}

// 對外暴露
return { start, pause, reset, currentTick, isRunning }
```

---

## Mock 資料劇本規劃

重點 objects（其餘 objects 保持 Normal 狀態）：

**Fan#2**（最終 Critical）
```ts
fanSpeed script: [3200, 3400, 3800, 4200, 4500, 4800, 4850, 4850]
// warning threshold: 4000, critical threshold: 4500
// tick 4 → warning alert，tick 5 → critical alert

temperature script: [45, 50, 55, 60, 63, 65, 67, 68]
// warning threshold: 62, critical threshold: 75
// tick 4 → warning alert
```

**ServerRack#1**（最終 Critical）
```ts
powerDensity script: [120, 130, 145, 160, 170, 180, 185, 190]
// warning threshold: 155, critical threshold: 175
```

**ThermalPad#2**（最終 Warning）
```ts
thermalResistance script: [0.8, 0.9, 1.0, 1.1, 1.15, 1.2, 1.2, 1.2]
// warning threshold: 1.1
```

總 tick 數：8（約 16 秒跑完一輪，適合 demo）

---

## 開發迭代與優先序

每個 iteration 結束都有可 demo 的成果，後期迭代疊加在前期基礎上，不互相阻擋。

### Iteration 1 — Layout Shell（目標：立刻有畫面）
所有值直接 hardcode 在 template，不依賴 store 或 mock 資料。

- App.vue：三欄 el-container 佈局（sidebar / main / detail）
- AppSidebar.vue：icon nav 裝飾
- AppHeader.vue：hardcode「Running」status、計時器靜態顯示、進度條、Stop 按鈕（無邏輯）
- ObjectList.vue：hardcode 4 筆 object row（Fan#2、ServerRack#1 等）
- ObjectDetail.vue：hardcode 單一 object 詳情，靜態 MetricCard
- MetricCard.vue：hardcode 數值 + status badge（無 sparkline）

**驗收：`npm run dev` 開啟後能看到完整三欄畫面，所有區塊都有內容**

### Iteration 2 — 靜態資料驅動（目標：真實資料 + 點擊互動）
引入最小 types + store，資料仍是靜態快照（不需要 script 時間序列）。

- `src/types/index.ts`：定義 Experiment、ObjectItem、Metric、Version interface
- `src/stores/experiment.ts`：state 為固定 "running" 快照資料，含 selectedObjectId
- ObjectList.vue 改為讀 store，點擊列 → 更新 selectedObjectId
- ObjectDetail.vue 改為讀 store 的 selectedObject，顯示對應 metrics
- AppHeader.vue 改為讀 store 的 experiment status

**驗收：點擊 ObjectList 不同列，右欄內容跟著切換**

### Iteration 3 — 版本流程（目標：Stop → Change Version → Apply 完整可 demo）
展示最關鍵的互動流程，不需要 simulation 引擎。

- AppHeader.vue：Stop 按鈕邏輯（store.stopExperiment），status 切換
- ChangeVersionModal.vue：el-dialog，版本列表 + Current/Last Run 標籤 + Apply 按鈕
- store.applyVersion：更新 object 的 currentVersion，標記 versionChanged
- ObjectList.vue：versionChanged 時顯示 ● 標記
- ObjectDetail.vue：Apply 後顯示空狀態
- Revert 按鈕邏輯（store.revertVersion）

**驗收：完整走過 Demo 腳本步驟 3–7（Stop → ChangeVersion → Apply → Revert）**

### Iteration 4 — Simulation 引擎（目標：Running 動態效果）
在已有畫面的基礎上疊加時間驅動。

- `src/data/mock.ts`：加入完整 8-tick 時間序列劇本（script 欄位）
- `src/composables/useSimulation.ts`：setInterval tick 推進、pause/resume/reset
- Pinia store 連接 simulation：每 tick 更新 metrics、觸發 alert、更新 progress
- AppHeader.vue：計時器改為真實 elapsed 秒數，進度條 reactive
- ObjectList.vue：status / alertCount reactive 更新
- MetricCard.vue：數值隨 tick 更新，超 threshold 顯示 alert 描述
- SparklineChart.vue：SVG 折線 + threshold 虛線

**驗收：完整走過 Demo 腳本步驟 1–2（Running → 等待 → alert 自動出現）**

### Iteration 5 — 收尾（目標：架構補齊 + 視覺調整）
- `src/services/experimentService.ts`：將 store 的直接 mock import 改為 async service 包裝
- LogPanel.vue：底部 log，隨 tick 追加
- Re-run 邏輯：重置 simulation，清空 alerts
- 視覺微調（顏色、間距對齊 Figma 設計稿）
- README：架構說明、demo 腳本、技術選型理由

**驗收：完整走過整份 Demo 腳本（步驟 1–8）**

---

## Demo 腳本（展示順序）

```
1. 進入畫面 → Running 狀態，計時器跑動，進度條推進
2. 等待 tick 推進 → Fan#2 出現 Warning → Critical，alert 自動出現
3. 點擊 Fan#2 → 右欄顯示 metrics + sparkline + alert 描述
4. 點擊 Stop → 狀態切換，Change Version enabled
5. 點擊 Change Version → Modal 開啟，選 v3.0 → Apply
6. 觀察 Fan#2：version 顯示 v3.0 ●，metrics 空狀態，Revert 按鈕出現
7. 點擊 ServerRack#1 → 同樣流程更換版本
8. 點擊 Re-run → 劇本重頭，兩個 object 以新版本重新跑
```

---

## 驗證方式

- `npm run dev` 啟動後逐步走過 Demo 腳本確認每個步驟
- 觀察 alert 在正確 tick 觸發（Fan#2 tick 4 出現 warning）
- 確認 Stop → Change Version 的 disabled/enabled 切換
- 確認 Apply 後 ObjectList 的 ● 標記與 ObjectDetail 的空狀態
- 確認 Re-run 後 simulation 重置，新版本 object 仍顯示（metrics 重新播放）
