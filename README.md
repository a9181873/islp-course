# ISLP 統計學習課程

基於 James, Witten, Hastie, Tibshirani (2023) *An Introduction to Statistical Learning with Applications in Python* 的學習筆記與程式碼。

## 結構
- `02_What_Is_Statistical_Learning.ipynb` — 第 2.1 節：什麼是統計學習？
- `data/` — 課程用資料集（Advertising、Income1、Income2）

## 使用方式
```bash
git clone https://github.com/a9181873/islp-course.git
cd islp-course
jupyter notebook
```

## 學習中心首頁

新版首頁整合完整 ISLP 章節目錄、AI Agent 學習路徑、跨內容搜尋、裝置內進度與人類學習節奏。既有 `statistics/`、`research/`、資料集與課程網址維持不變。

首頁原始碼位於 `learning-hub/`：

```bash
cd learning-hub
pnpm install
pnpm test
pnpm check
pnpm build
```

`pnpm build` 會將靜態首頁輸出至儲存庫根目錄，同時保留既有課程檔案。HermesAgent 維運開發 Skill 位於 `skills/dky-learning-hub-ops/`。
