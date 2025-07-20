# Pokémon GO 好友列表專案

這是一個基於 Next.js 建構的靜態網站，可以從 Google Sheets 抓取訓練家資料並產生 QR Code 好友邀請卡片。

## 🎯 主要功能

- ✅ **Google Sheets 整合**：自動從指定的 Google Sheets 抓取訓練家資料
- ✅ **QR Code 產生**：為每個訓練家代碼建立正確格式的好友邀請 QR Code
- ✅ **正確的 QR 格式**：使用 Pokémon GO 官方 URL 格式 (`pokemongo.app.link`)
- ✅ **代碼驗證**：自動驗證12位訓練家代碼格式並提供錯誤提示
- ✅ **響應式設計**：支援桌機、平板、手機等各種螢幕尺寸
- ✅ **靜態部署**：可部署到 GitHub Pages、Netlify、Vercel 等平台
- ✅ **TypeScript 支援**：提供完整的型別安全和開發體驗
- ✅ **美觀介面**：使用 Tailwind CSS 建立現代化 UI

## 📊 Google Sheets 設定

您的 Google Sheets 應包含以下欄位結構：

| 時間戳記 | 訓練家名稱 | 訓練家代碼 | 隊伍 | 活動區域 | ... | 訓練家代碼(純數字) |
|---------|------------|------------|------|----------|-----|-------------------|
| 2025/3/2 | Hawks10069 | 1929 8217 8895 | 紅隊 | 臺中市 | ... | 192982178895 |
| 2025/3/2 | cowcowsong | 6757 6246 2028 | 黃隊 | 臺中市 | ... | 675762462028 |

**重要欄位**：
- **第2欄**：訓練家名稱
- **第3欄**：訓練家代碼（格式：1929 8217 8895）
- **最後一欄**：純數字訓練家代碼（格式：192982178895）

## 🔧 訓練家代碼格式

- **輸入格式**：1929 8217 8895 (有空格分隔)
- **儲存格式**：192982178895 (12位純數字)
- **顯示格式**：1929 8217 8895 (自動格式化)
- **QR Code 格式**：`https://pokemongo.app.link/friends/accept/192982178895`

## 🚀 部署到 GitHub Pages

### 自動部署設定

1. **建立 GitHub 儲存庫並推送程式碼**：
   ```bash
   git init
   git add .
   git commit -m "初始建立：Pokemon GO 好友列表"
   git branch -M main
   git remote add origin https://github.com/您的使用者名稱/PokemonGOFriend.git
   git push -u origin main
   ```

2. **更新設定檔案**：
   - 修改 `package.json` 中的 `homepage` URL
   - 將 `yourusername` 替換為您的 GitHub 使用者名稱

3. **啟用 GitHub Pages**：
   - 到 GitHub 儲存庫設定
   - 找到 "Pages" 設定
   - Source 選擇 "GitHub Actions"

4. **部署完成**：
   - 每次推送到 `main` 分支會自動觸發部署
   - 網站網址：`https://您的使用者名稱.github.io/PokemonGOFriend`

### 手動部署

```bash
# 建構專案
npm run export

# 部署到 gh-pages 分支
npx gh-pages -d out
```

## 💻 本地開發

### 安裝相依套件
```bash
npm install
```

### 開發模式執行
```bash
npm run dev
```
開啟 http://localhost:3000 查看結果

### 建構靜態檔案
```bash
npm run export
```

### 本地測試靜態檔案
```bash
cd out
python -m http.server 8000
# 或
npx serve .
```

## 🛠 技術架構

- **框架**：Next.js 14 (App Router)
- **語言**：TypeScript
- **樣式**：Tailwind CSS
- **QR Code**：qrcode 套件
- **部署**：GitHub Actions + GitHub Pages

## 📝 專案結構

```
PokemonGOFriend/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 主佈局
│   └── page.tsx           # 首頁
├── components/            # React 元件
│   └── TrainerCard.tsx    # 訓練家卡片
├── lib/                   # 工具函式
│   ├── qrcode.ts         # QR Code 產生
│   └── sheets.ts         # Google Sheets 資料抓取
├── types/                 # TypeScript 型別定義
│   └── trainer.ts        # 訓練家資料型別
├── styles/               # 樣式檔案
│   └── globals.css       # 全域樣式
├── .github/workflows/    # GitHub Actions
│   └── deploy.yml        # 自動部署設定
└── public/               # 靜態檔案
    └── favicon.html      # 網站圖示
```

## 🔍 故障排除

### 無法抓取 Google Sheets 資料
- 確認 Google Sheets 是公開可讀取的
- 檢查瀏覽器控制台的錯誤訊息
- 系統會自動使用模擬資料作為備援

### QR Code 無法掃描
- 確認訓練家代碼是12位數字
- 檢查 QR Code 是否包含正確的 pokemongo.app.link URL

### GitHub Pages 部署失敗
- 檢查 GitHub Actions 的執行日誌
- 確認 `package.json` 中的 homepage URL 正確
- 確保儲存庫設定中已啟用 GitHub Pages

## 📄 授權

MIT License - 可自由使用和修改
