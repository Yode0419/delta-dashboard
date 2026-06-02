# Delta Dashboard — Vue 3 Prototype 開發計畫

## Context

台達電 UIUX Engineer 面試作業的延伸開發。設計稿已完成（Figma），目標是將 dashboard wireframe 實作為可互動的 Vue 3 prototype，用以展示設計到前端開發的銜接能力。

面試複試約 9 天後，開發以「核心流程可完整演示」為優先，不追求完美，視時間能做多少算多少。開發過程需要 AI 輔助。

**設計稿：** https://www.figma.com/design/yKyKVcdDzVGrTWKFqAl1QL/Delta-Assignment---yode?node-id=141-1116

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
| UI Library | Element Plus | 台達團隊使用，省去元件樣式刻制時間 |
| 狀態管理 | Pinia | Vue 3 標準選擇，結構清晰易解釋 |
| Sparkline | SVG 手刻 | 需求簡單，展示基礎 SVG 知識，無額外依賴 |

**安裝指令：**
```bash
npm create vite@latest delta-dashboard -- --template vue-ts
cd delta-dashboard
npm install element-plus pinia
npm install -D @types/node
```

---

## 專案架構

```
delta-dashboard/
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

## 開發階段與優先序

### Phase 1 — 基礎建設（先做，必要）
- 專案初始化
- `types/index.ts` 定義所有 interface
- `data/mock.ts` 寫入完整劇本資料
- `services/experimentService.ts` 所有 async 函式
- Pinia store 骨架（狀態欄位 + actions 定義）
- App.vue 三欄 layout（Element Plus el-container）
- AppSidebar.vue（純裝飾）

### Phase 2 — 模擬引擎（核心差異點）
- `composables/useSimulation.ts` 完整實作
- AppHeader.vue：Status / Duration 計時器 / 進度條 / Stop–Re-run 切換
- ObjectList.vue：表格，status/alert/version 隨 tick reactive 更新

### Phase 3 — 互動流程
- ObjectDetail.vue：點擊 ObjectList 切換右欄內容
- MetricCard.vue：數值 + status badge
- SparklineChart.vue：SVG 折線 + threshold 虛線
- Alert 顯示：MetricCard 下方 inline alert 描述

### Phase 4 — 版本流程
- ChangeVersionModal.vue：版本列表 + Current/Last Run 標籤 + Apply
- Apply 邏輯：store.applyVersion → object 空狀態 + ● 標記
- Revert 按鈕：store.revertVersion → 恢復原狀態

### Phase 5 — 收尾（有時間再做）
- LogPanel.vue：tick 追加 log 條目
- Re-run：reset simulation，清空 alerts
- 視覺微調（顏色、間距對齊設計稿）
- README：說明架構、demo 腳本、技術選型理由

---

## Demo 腳本（面試演示順序）

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
