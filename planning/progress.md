# 開發進度

## 待辦清單

### Iteration 1 — Layout Shell
> 驗收：`npm run dev` 後看到完整三欄畫面，所有區塊有內容

- [x] `App.vue` 三欄 el-container 佈局（sidebar / main / detail）
- [x] `AppSidebar.vue` icon nav 裝飾
- [x] `AppHeader.vue` hardcode Running status、靜態計時器、進度條、Stop 按鈕（無邏輯）
- [x] `ObjectList.vue` hardcode 4 筆 object row
- [x] `ObjectDetail.vue` hardcode 單一 object 詳情 + 靜態 MetricCard
- [x] `MetricCard.vue` hardcode 數值 + status badge（無 sparkline）

### Iteration 2 — 靜態資料驅動
> 驗收：點擊 ObjectList 不同列，右欄內容跟著切換

- [x] `src/types/index.ts` Experiment、ObjectItem、Metric、Version interface
- [x] `src/stores/experiment.ts` 固定 running 快照資料 + selectedObjectId
- [x] `ObjectList.vue` 改讀 store，點擊列更新 selectedObjectId
- [x] `ObjectDetail.vue` 改讀 store selectedObject
- [x] `AppHeader.vue` 改讀 store experiment status

### Iteration 3 — 版本流程
> 驗收：完整走過 Demo 腳本步驟 3–7（Stop → ChangeVersion → Apply → Revert）

- [x] `AppHeader.vue` Stop 按鈕邏輯（store.stopExperiment），status 切換
- [x] `ChangeVersionModal.vue` el-dialog，版本列表 + Current/Last Run 標籤 + Apply
- [x] `store.applyVersion` 更新 currentVersion，標記 versionChanged
- [x] `ObjectList.vue` versionChanged 時顯示 ● 標記
- [x] `ObjectDetail.vue` Apply 後顯示空狀態
- [x] Revert 按鈕邏輯（store.revertVersion）

### Iteration 4 — Simulation 引擎
> 驗收：完整走過 Demo 腳本步驟 1–2（Running → 等待 → alert 自動出現）

- [x] `src/data/mock.ts` 動態 script 生成器（drift+noise per tick，tick 數可設定）
- [x] `src/composables/useSimulation.ts` setInterval tick 推進、pause/resume/reset
- [x] Pinia store 連接 simulation（tick 更新 metrics、觸發 alert、更新 progress）
- [x] `AppHeader.vue` 計時器改為 elapsed 秒數，進度條 reactive
- [x] `ObjectList.vue` status / alertCount reactive 更新
- [x] `MetricCard.vue` 數值隨 tick 更新，超 threshold 顯示 alert 描述
- [ ] `SparklineChart.vue` 使用 vue-chartjs（Chart.js wrapper），折線 + threshold 虛線

### Iteration 5 — 收尾
> 驗收：完整走過整份 Demo 腳本（步驟 1–8）

- [ ] `src/services/experimentService.ts` async service 包裝，components 不直接 import mock
- [x] `LogPanel.vue` 底部 log，隨 tick 追加
- [x] Re-run 邏輯：重置 simulation，清空 alerts
- [ ] 視覺微調（顏色、間距對齊 Figma 設計稿）
- [ ] README：架構說明、demo 腳本、技術選型理由

---

## 開發日誌

### 2026-06-04
- 完成 Iteration 3：Stop/Re-run、applyVersion、revertVersion 流程全部連線
- 新增 StatusCell.vue，統一 status 顯示；修正 mock data currentVersion 與 lastRun 一致性
- 加入 `.prettierrc`（no semi、single quote），並對全專案執行 Prettier，統一程式碼風格
- 重構 store 架構（Iteration 4 前置）：`experiment.ts` 拆為 4 個 domain store，新增 `useExperimentSession` composable 協調跨 store 業務邏輯；`AppHeader` 進度條串接 `experiment.progress`
- ObjectDetail description 改從 `Version.description` 取得，所有 object 補齊版本資料；`ObjectItem.description` 欄位移除
- 完成 Iteration 4 核心：以 drift+noise generator 取代固定腳本，每次 re-run 產生不同軌跡；所有 14 個 object 補齊 metrics 與第二版本；store 全面串接 tick 驅動（metrics/alerts/logs/progress）
- mock.ts 拆分為 5 個 domain 檔案（barrel 模式）；alert 描述 inline 產生，不再依賴獨立函數
- `ObjectItem.status` 與 `Metric.status` 初始為 `null`，首次 tick 後才計算；修正 re-run 閃爍 bug（mockObjects 深拷貝 + reset 順序）
- KpiCard 串接 simulation：新增 `mockKpi.ts`，KPI 流程與 Metric 對齊；初始顯示 `-`，tick 後更新值與狀態燈號

### 2026-06-03
- 調整開發策略為 UI-first 迭代，更新計畫文件與待辦清單結構
- 完成 Iteration 1 佈局骨架：建立所有 component（AppSidebar、AppHeader、HeatmapPanel、LogPanel、ObjectsPanel、ObjectList、ObjectDetail、MetricCard、KpiCard）
- main.css 引入 Inter 字型並定義 typography utility class
- 完成 Iteration 1 靜態 UI：ObjectList 改用 el-table（SVG 圖示欄、排序、highlight）、ObjectDetail 實作 summary 區塊、MetricCard 加入 alertDesc prop 與 footer、KpiCard 完成數值排版
- 新增 ChangeVersionDialog.vue（el-dialog + radio 版本選擇表格、row-click 聯動）
- 完成 Iteration 2：建立 types、mock.ts、experiment store，所有元件改讀 store，點擊 ObjectList 右欄正確切換
- 修正 LogPanel 雙層捲軸問題

### 2026-06-02
- 初始化 git repo，推送至 GitHub（Yode0419/delta-dashboard）
- 建立 CLAUDE.md，記錄專案背景與架構
- 新增 planning/prototype-plan.md、planning/progress.md
- 建立 .claude/commands/commit.md、log.md skill
- 安裝 element-plus，在 main.ts 全域註冊
- 清除 Vue 預設 scaffolding（HelloWorld、TheWelcome、WelcomeItem、icons、counter store、base.css、logo.svg）
- App.vue 改為標準三區塊結構（script/template/style），放置 el-button 驗證 Element Plus 引入正常
- main.css 簡化為基礎 reset
