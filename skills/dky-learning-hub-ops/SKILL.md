---
name: dky-learning-hub-ops
description: Develop, synchronize, validate, release, and troubleshoot the DKY Learn hub that integrates the ISLP course with Agentic AI resources. Use for course catalog changes, learning UX work, upstream content sync, deployment checks, and production incidents; do not use for unrelated websites.
license: MIT
metadata:
  hermes:
    version: 1.0.0
    author: DKY Learn
    platforms: [macos, linux]
    tags: [learning-platform, islp, react, typescript, operations, cloudflare]
    category: web-development
    requires_toolsets: [terminal]
---

# DKY Learn 維運開發

## 使用時機

在下列任務載入本 Skill：

- 同步 `a9181873/islp-course` 的章節、課名、網址或研究文章。
- 調整學習目錄、搜尋、進度、行動版導覽或可及性。
- 修復 React／TypeScript、測試、建置或部署問題。
- 發布新版、執行上線檢查，或處理線上事故。

## 先判斷工作模式

1. **內容同步**：讀取 [內容契約](references/content-contract.md)，先產生來源差異與對應表，再修改 catalog。
2. **功能開發**：以 `client/src/data/learningCatalog.ts` 為內容來源，以 `client/src/pages/Home.tsx` 與 `client/src/index.css` 為介面層。
3. **發布或事故**：讀取 [維運手冊](references/runbook.md)，沿用專案既有部署方式與回復點。

## 工作流程

1. 找到同時包含 `package.json` 與 `client/src/data/learningCatalog.ts` 或 `src/data/learningCatalog.ts` 的前端根目錄；在課程儲存庫中通常是 `learning-hub/`。先檢查版本控制狀態與 package manager；保留未授權的既有變更。
2. 明確列出本次影響的是內容、互動、樣式、後端或部署。對線上站與上游儲存庫先做唯讀檢查。
3. 修改內容時維持穩定的 lesson `id`；進度存在使用者裝置內，任意改 ID 會讓既有進度失聯。上游檔名變更時先做舊網址相容或重新導向。
4. 修改介面時保留五個主要章節錨點、鍵盤焦點、行動版目錄、`prefers-reduced-motion` 與可辨識的完成狀態。不要把長內容重新塞成同質卡片牆。
5. 執行結構稽核；參數必須是前端根目錄。例如從課程儲存庫根目錄執行：`node skills/dky-learning-hub-ops/scripts/audit-learning-hub.mjs learning-hub`。
6. 依序執行 `pnpm test`、`pnpm check`、`pnpm build`。只修正與本任務相關的失敗；若環境缺少依賴，先說明再安裝。
7. 發布前摘要來源變更、使用者可見差異、風險與回復點。沒有明確發布授權時，停在可部署成品與驗證結果。
8. 上線後至少檢查首頁、任一統計課程連結、搜尋、進度勾選與手機目錄；失敗時停止擴大變更，依維運手冊回復。

## 安全與內容邊界

- 不將未審核的上游提交直接覆蓋正式內容；先比較新增、刪除、改名與網址變動。
- 不把密鑰、部署憑證、cookie 或環境變數值寫入紀錄、提交或回覆。
- 不在未獲授權時推送、部署、清除快取、變更 DNS、資料庫或正式環境設定。
- 不把「頁面可開」當成學習品質完成；必須同時確認定位、時間、成果、提取與實作入口。

## 常見陷阱

- 課程數量正確但同一課重複：用 `id` 與 canonical URL 雙重去重。
- `.html` 與無副檔名網址並存：以正式站重新導向後的 canonical 路徑為準，保留舊連結可用。
- 搜尋結果有內容、章節目錄卻沒有：catalog 應是兩者共同來源，避免平行維護第二份清單。
- 測試通過但手機無法使用：固定側欄必須轉成可關閉抽屜，遮罩與 Escape／焦點行為要可預期。
- 任意重命名 lesson ID：會造成使用者 `localStorage` 進度消失；需要 migration 才能改。

## 完成標準

- 稽核腳本、測試、型別檢查與正式建置皆通過。
- 新增或變更的課程可從目錄與搜尋抵達，且原始來源可追溯。
- 桌機與手機都有清楚目錄；鍵盤、完成勾選與 reduced motion 行為保留。
- 發布任務取得可用網址並完成抽樣檢查；未發布任務交付可部署版本與剩餘步驟。
