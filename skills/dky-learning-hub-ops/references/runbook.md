# 維運手冊

## 發布前

1. 確認工作目錄與版本控制狀態，只納入本次變更。
2. 執行：

   ```bash
   node skills/dky-learning-hub-ops/scripts/audit-learning-hub.mjs learning-hub
   pnpm --dir learning-hub test
   pnpm --dir learning-hub check
   pnpm --dir learning-hub build
   ```

3. 確認正式建置輸出存在，且沒有把 `.env`、憑證、暫存下載或測試產物包入。
4. 記錄目前正式版本或 commit，做為回復點。
5. 沿用專案既有託管平台、網域與部署命令；不要因部署方便而更換架構。

## 上線抽樣

- 首頁回傳成功，標題與主要目錄正確。
- 至少一個 Ch 2、一個 Lab 與一個 Ch 10 課程網址可達。
- 搜尋「SVM」與「記憶」能找到跨課程／研究內容。
- 勾選完成後重新整理仍保留，取消勾選也正常。
- 390px 寬度可開關目錄，沒有主要內容水平溢出。
- 外部連結使用新分頁且帶 `rel="noreferrer"`。

## 事故分流

### 首頁無法開啟

先確認 DNS／TLS、平台部署狀態與靜態資產，再看應用程式紀錄。不要同時修改 DNS、建置與應用程式；一次驗證一層。

### 首頁正常、課程 404

抽查 redirect 與大小寫，核對 GitHub 檔名、正式站 canonical 路徑與 catalog href。若大量失敗，先回復上一版 catalog。

### 搜尋或進度壞掉

檢查瀏覽器錯誤與 `localStorage` schema。不要直接清除使用者資料；新增 migration 或容錯讀取。

### 樣式或手機導覽壞掉

先回復最近的 CSS／導覽變更，不動內容資料。確認固定側欄斷點、遮罩 z-index 與 `overflow`。

## 回復

1. 停止繼續發布相同失敗版本。
2. 將流量或部署回復到已知良好版本。
3. 抽查首頁、課程網址與搜尋。
4. 保存錯誤時間、影響範圍、版本與最小重現；不要保存密鑰或個資。
5. 在獨立修正中加入能捕捉此次失敗的結構或行為驗證，再重新發布。
