# 開發進度

## 待辦清單

### 基礎建設
- [ ] `src/types/index.ts` — 所有 TypeScript interface
- [ ] `src/data/mock.ts` — 時間序列劇本資料
- [ ] `src/services/experimentService.ts` — async service 層
- [ ] `src/stores/experiment.ts` — Pinia store 骨架
- [ ] `App.vue` 三欄佈局（Element Plus）
- [ ] `AppSidebar.vue`（裝飾用）

### 模擬引擎
- [ ] `composables/useSimulation.ts` — tick 推進
- [ ] `AppHeader.vue` — 狀態、計時器、進度條、Stop/Re-run
- [ ] `ObjectList.vue` — 表格，reactive 更新

### 物件詳情與指標
- [ ] `ObjectDetail.vue` — 右欄 + 空狀態
- [ ] `MetricCard.vue` — 數值、status badge、alert 描述
- [ ] `SparklineChart.vue` — SVG 折線 + threshold 虛線

### 版本流程
- [ ] `ChangeVersionModal.vue` — 版本列表 + Apply
- [ ] Apply 邏輯 — 空狀態 + ● 標記
- [ ] Revert 按鈕

### 收尾
- [ ] `LogPanel.vue` — tick 追加 log
- [ ] Re-run — 重置模擬、清空 alerts
- [ ] 視覺微調（對齊設計稿）

---

## 開發日誌

### 2026-06-02
- 初始化 git repo，推送至 GitHub（Yode0419/delta-dashboard）
- 建立 CLAUDE.md，記錄專案背景與架構
- 新增 planning/prototype-plan.md、planning/progress.md
- 建立 .claude/commands/commit.md skill
