const fs = require('fs');
const path = require('path');

// 解析中文時間格式的函式
function parseChineseDateTime(dateTimeString) {
  if (!dateTimeString) return null;
  
  try {
    // 嘗試手動解析中文格式: "2025/3/2 上午 7:36:47"
    const match = dateTimeString.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})\s+(上午|下午)\s+(\d{1,2}):(\d{1,2}):(\d{1,2})/);
    if (match) {
      const [, year, month, day, period, hour, minute, second] = match;
      
      let hour24 = parseInt(hour);
      if (period === '下午' && hour24 !== 12) {
        hour24 += 12;
      } else if (period === '上午' && hour24 === 12) {
        hour24 = 0;
      }
      
      const manualDate = new Date(
        parseInt(year),
        parseInt(month) - 1, // JavaScript 月份從 0 開始
        parseInt(day),
        hour24,
        parseInt(minute),
        parseInt(second)
      );
      
      if (!isNaN(manualDate.getTime())) {
        return manualDate.toISOString();
      }
    }
    
    return null;
  } catch (error) {
    console.warn('時間解析錯誤:', error);
    return null;
  }
}

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
          const timestamp = columns[0] || ''; // 第一欄可能是時間戳記
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
            const trainer = {
              name: trainerName,
              id: trainerCode
            };
            
            // 如果第一欄看起來像時間戳記，就加入
            if (timestamp && (timestamp.includes('-') || timestamp.includes('/') || timestamp.includes('T') || timestamp.includes(':'))) {
              // 先嘗試中文時間格式解析
              const parsedTime = parseChineseDateTime(timestamp);
              if (parsedTime) {
                trainer.timestamp = parsedTime;
              } else {
                // 嘗試標準時間格式解析
                try {
                  const date = new Date(timestamp);
                  if (!isNaN(date.getTime())) {
                    trainer.timestamp = date.toISOString();
                  }
                } catch (e) {
                  // 如果無法解析時間，就不加入時間戳記
                }
              }
            }
            
            trainers.push(trainer);
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
