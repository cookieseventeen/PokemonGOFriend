import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const sheetId = '1UpaoJ8s_cQvqTDamczEPzHGDHkvLNwTHnXbrWYkhYy8';
    const gid = '473917600';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${gid}`;
    
    console.log('API: 嘗試抓取 CSV URL:', csvUrl);
    
    const response = await fetch(csvUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    console.log('API: 成功獲取 CSV 資料，長度:', csvText.length);
    
    return NextResponse.json({
      success: true,
      data: csvText,
      lines: csvText.split('\n').length
    });
    
  } catch (error) {
    console.error('API: 抓取失敗:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
