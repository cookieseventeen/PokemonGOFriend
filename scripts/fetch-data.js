const fs = require('fs');
const path = require('path');

async function fetchTrainersData() {
  try {
    const sheetId = '1UpaoJ8s_cQvqTDamczEPzHGDHkvLNwTHnXbrWYkhYy8';
    const gid = '473917600';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    
    console.log('正在抓取訓練家資料...');
    console.log('URL:', csvUrl);
    
    const { default: fetch } = await import('node-fetch');
    const response = await fetch(csvUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log(`成功抓取 CSV 資料，總長度: ${csvText.length}`);
    console.log(`總行數: ${csvText.split('\n').length}`);
    
    // 解析 CSV 資料
    const lines = csvText.split('\n');
    const trainers = [];
    let processedLines = 0;
    let skippedLines = 0;
    
    // 跳過標題列，從第二列開始
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        processedLines++;
        
        // 簡單的 CSV 解析
        const columns = [];
        let current = '';
        let inQuotes = false;
        
        for (let j = 0; j < line.length; j++) {
          const char = line[j];
          
          if (char === '"' && !inQuotes) {
            inQuotes = true;
          } else if (char === '"' && inQuotes) {
            inQuotes = false;
          } else if (char === ',' && !inQuotes) {
            columns.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        columns.push(current.trim());
        
        // 檢查是否有足夠的欄位
        if (columns.length >= 3 && columns[1] && (columns[2] || columns[columns.length - 1])) {
          const trainerName = columns[1];
          
          // 優先使用最後一欄的純數字代碼
          let trainerCode = '';
          if (columns[columns.length - 1] && /^\d{12}$/.test(columns[columns.length - 1])) {
            trainerCode = columns[columns.length - 1];
          } else if (columns[2]) {
            trainerCode = columns[2].replace(/\D/g, '');
          }
          
          // 確保是12位數字
          if (trainerCode && trainerCode.length === 12) {
            trainers.push({
              name: trainerName,
              id: trainerCode
            });
          } else {
            skippedLines++;
          }
        } else {
          skippedLines++;
        }
      }
    }
    
    console.log(`解析完成: 處理了 ${processedLines} 行, 成功解析 ${trainers.length} 位訓練家, 跳過 ${skippedLines} 行`);
    
    // 將資料寫入 JSON 檔案
    const outputPath = path.join(__dirname, '..', 'public', 'trainers-data.json');
    fs.writeFileSync(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      totalTrainers: trainers.length,
      trainers: trainers
    }, null, 2));
    
    console.log(`資料已儲存到: ${outputPath}`);
    console.log(`前5位訓練家:`, trainers.slice(0, 5));
    
  } catch (error) {
    console.error('抓取資料失敗:', error);
    process.exit(1);
  }
}

fetchTrainersData();
