import { Trainer } from '@/types/trainer';

// 使用 CORS 代理或公開的 CSV 端點
function getCSVUrl(sheetUrl: string): string {
  const sheetId = '1UpaoJ8s_cQvqTDamczEPzHGDHkvLNwTHnXbrWYkhYy8';
  const gid = '473917600';
  
  // 嘗試多個方法來獲取 CSV 資料
  const directUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
  
  // 如果是開發環境，使用 CORS 代理
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return `https://cors-anywhere.herokuapp.com/${directUrl}`;
  }
  
  // 生產環境直接使用 Google Sheets URL
  return directUrl;
}

// 解析 CSV 資料
function parseCSV(csv: string): Trainer[] {
  const lines = csv.split('\n');
  const trainers: Trainer[] = [];
  let processedLines = 0;
  let skippedLines = 0;
  
  console.log(`開始解析 CSV: 總共 ${lines.length} 行`);
  
  // 跳過標題列，從第二列開始
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      processedLines++;
      
      // 使用簡單的逗號分隔解析，處理包含逗號的欄位
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
      
      // 只在前5行顯示詳細除錯資訊
      if (i <= 5) {
        console.log(`第 ${i} 行解析:`, {
          totalColumns: columns.length,
          trainerName: columns[1],
          trainerCodeFormatted: columns[2],
          trainerCodeClean: columns[columns.length - 1]
        });
      }
      
      // 檢查是否有足夠的欄位（至少需要訓練家名稱和代碼）
      if (columns.length >= 3 && columns[1] && (columns[2] || columns[columns.length - 1])) {
        const trainerName = columns[1];
        
        // 優先使用最後一欄的純數字代碼，如果沒有則使用第3欄並清理
        let trainerCode = '';
        if (columns[columns.length - 1] && /^\d{12}$/.test(columns[columns.length - 1])) {
          // 最後一欄是12位純數字
          trainerCode = columns[columns.length - 1];
        } else if (columns[2]) {
          // 使用第3欄並清理空格
          trainerCode = columns[2].replace(/\D/g, '');
        }
        
        // 確保是12位數字
        if (trainerCode && trainerCode.length === 12) {
          trainers.push({
            name: trainerName,
            id: trainerCode
          });
          if (i <= 5) {
            console.log(`✅ 成功加入: ${trainerName} -> ${trainerCode}`);
          }
        } else {
          skippedLines++;
          if (i <= 5 || skippedLines <= 10) {
            console.warn(`❌ 跳過無效資料 (第${i}行): 名稱="${trainerName}", 代碼="${trainerCode}" (長度: ${trainerCode?.length || 0})`);
          }
        }
      } else {
        skippedLines++;
        if (i <= 5) {
          console.warn(`❌ 跳過無效行 (第${i}行): 欄位不足 (${columns.length}欄)`);
        }
      }
    }
  }
  
  console.log(`解析完成: 處理了 ${processedLines} 行, 成功解析 ${trainers.length} 位訓練家, 跳過 ${skippedLines} 行`);
  
  return trainers;
}

// 模擬資料（以防 Google Sheets 無法存取）
function getMockData(): Trainer[] {
  return [
    { name: "範例訓練家1", id: "192982178895" }, // 對應 1929 8217 8895 格式
    { name: "範例訓練家2", id: "987654321098" },
    { name: "範例訓練家3", id: "555666777888" },
    { name: "範例訓練家4", id: "111222333444" },
    { name: "範例訓練家5", id: "999888777666" }
  ];
}

// 獲取訓練家資料
export async function getTrainersData(): Promise<Trainer[]> {
  try {
    // 首先嘗試使用本地 JSON 檔案（建構時產生的資料）
    try {
      console.log('嘗試讀取本地訓練家資料...');
      const response = await fetch('/trainers-data.json');
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ 成功讀取本地資料: ${data.totalTrainers} 位訓練家`);
        console.log('資料時間戳:', data.timestamp);
        return data.trainers;
      }
    } catch (jsonError) {
      console.warn('本地 JSON 檔案讀取失敗:', jsonError);
    }

    // 備用方案1：嘗試使用 API 路由
    if (typeof window !== 'undefined' || process.env.NODE_ENV === 'development') {
      try {
        console.log('嘗試使用 API 路由抓取資料...');
        const apiResponse = await fetch('/api/sheets');
        
        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          if (apiData.success) {
            console.log('✅ API 路由成功，資料行數:', apiData.lines);
            const parsedData = parseCSV(apiData.data);
            
            if (parsedData.length > 0) {
              console.log('✅ 使用 API 路由獲取的資料');
              return parsedData;
            }
          }
        }
      } catch (apiError) {
        console.warn('API 路由失敗:', apiError);
      }
    }
    
    // 備用方案2：直接抓取 Google Sheets
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/1UpaoJ8s_cQvqTDamczEPzHGDHkvLNwTHnXbrWYkhYy8/edit?gid=473917600#gid=473917600';
    const csvUrl = getCSVUrl(sheetUrl);
    
    console.log('嘗試直接抓取 CSV URL:', csvUrl);
    
    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/csv',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      mode: 'cors',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const parsedData = parseCSV(csvText);
    
    if (parsedData.length > 0) {
      console.log('✅ 使用直接抓取的 Google Sheets 資料');
      return parsedData;
    } else {
      throw new Error('解析結果為空');
    }
    
  } catch (error) {
    console.error('所有資料獲取方法都失敗，使用模擬資料:', error);
    console.log('🔄 改用模擬資料');
    return getMockData();
  }
}
