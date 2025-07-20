import QRCode from 'qrcode';

/**
 * 產生 Pokémon GO 訓練家代碼的 QR Code
 * Pokémon GO 的好友邀請 QR Code 包含特定的 URL 格式
 * @param trainerCode 訓練家代碼 (12位數字)
 * @returns QR Code 的 Data URL
 */
export async function generateQRCode(trainerCode: string): Promise<string> {
  try {
    // 清理訓練家代碼，只保留數字
    const cleanCode = trainerCode.replace(/\D/g, '');
    
    // 驗證訓練家代碼格式 (應該是12位數字)
    if (cleanCode.length !== 12) {
      console.warn(`訓練家代碼長度不正確: ${cleanCode} (長度: ${cleanCode.length})`);
    }
    
    // Pokémon GO 好友邀請的 URL 格式
    // 這個 URL 會在掃描時自動開啟 Pokémon GO 應用程式並發送好友邀請
    const pokemonGoUrl = `https://pokemongo.app.link/friends/accept/${cleanCode}`;
    
    const qrCodeDataURL = await QRCode.toDataURL(pokemonGoUrl, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M' // 中等錯誤修正等級，適合 URL
    });
    
    return qrCodeDataURL;
  } catch (error) {
    console.error('產生 QR Code 時發生錯誤:', error);
    return '';
  }
}

/**
 * 驗證訓練家代碼格式
 * @param trainerCode 訓練家代碼
 * @returns 是否為有效格式
 */
export function validateTrainerCode(trainerCode: string): boolean {
  const cleanCode = trainerCode.replace(/\D/g, '');
  return cleanCode.length === 12;
}

/**
 * 格式化訓練家代碼顯示 (加入空格分隔)
 * @param trainerCode 訓練家代碼
 * @returns 格式化後的代碼 (例: 1234 5678 9012)
 */
export function formatTrainerCode(trainerCode: string): string {
  const cleanCode = trainerCode.replace(/\D/g, '');
  return cleanCode.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
}
