# Pokemon GO 好友代碼網站 - 部署指南

## 📁 專案狀態
✅ 專案已完成建構  
✅ 靜態檔案已產生 (`/out` 目錄)  
✅ 訓練家資料已載入 (312 位訓練家)  
✅ QR 碼功能已實作  
✅ Git 儲存庫已初始化  
✅ GitHub Actions 工作流程已設定  

## 🚀 部署步驟

### 1. 建立 GitHub 儲存庫
請前往 GitHub 建立新儲存庫：
- URL: https://github.com/new
- 儲存庫名稱: `PokemonGOFriend`
- 設定: Public (公開)
- 不要勾選 "Add a README file"

### 2. 設定 Remote URL
建立儲存庫後，執行以下指令設定正確的 remote URL：
```bash
# 移除現有的 remote（如果不正確）
git remote remove origin

# 新增正確的 remote URL（替換 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/PokemonGOFriend.git

# 推送程式碼
git push -u origin main
```

### 3. 啟用 GitHub Pages
在 GitHub 儲存庫設定中：
1. 前往 Settings → Pages
2. Source 選擇 "GitHub Actions"
3. 工作流程會自動觸發部署

## 🌐 網站路徑
部署完成後，您的網站將可在以下位址存取：
```
https://YOUR_USERNAME.github.io/PokemonGOFriend
```

## 📊 專案資訊
- **總訓練家數**: 312 位
- **資料來源**: Google Sheets
- **QR 碼格式**: Pokemon GO 深層連結
- **建構工具**: Next.js 14
- **部署平台**: GitHub Pages

## 🔧 本機測試
```bash
# 建構靜態網站
npm run export

# 使用 serve 測試（需安裝 serve 套件）
npx serve out

# 或使用 Python 簡單伺服器
cd out && python3 -m http.server 8000
```

## 📱 功能特色
- 響應式設計，支援手機和桌面
- 312 位訓練家的 QR 碼產生
- Pokemon GO 深層連結整合
- 自動資料更新（建構時抓取）
- 搜尋和篩選功能

## 🔄 更新資料
當 Google Sheets 資料更新時：
1. 推送任何變更到 main 分支
2. GitHub Actions 會自動重新抓取資料並部署

---
建立日期: 2025年7月20日
專案版本: 1.0.0
