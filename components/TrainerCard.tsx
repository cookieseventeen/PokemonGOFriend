'use client';

import { useEffect, useState } from 'react';
import { Trainer } from '@/types/trainer';
import { generateQRCode, validateTrainerCode, formatTrainerCode } from '@/lib/qrcode';

interface TrainerCardProps {
  trainer: Trainer;
}

export default function TrainerCard({ trainer }: TrainerCardProps) {
  const [qrCode, setQrCode] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isValidCode, setIsValidCode] = useState(true);

  useEffect(() => {
    async function loadQRCode() {
      if (trainer.id) {
        try {
          // 驗證訓練家代碼格式
          const isValid = validateTrainerCode(trainer.id);
          setIsValidCode(isValid);
          
          // 產生 QR Code (包含 Pokémon GO URL)
          const qrCodeData = await generateQRCode(trainer.id);
          setQrCode(qrCodeData);
        } catch (error) {
          console.error('產生 QR Code 失敗:', error);
        }
      }
      setLoading(false);
    }

    loadQRCode();
  }, [trainer.id]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(trainer.id);
      // 使用現代化的通知方式
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('訓練家代碼已複製！', {
          body: `${trainer.name} 的代碼已複製到剪貼簿`,
          icon: '/favicon.ico'
        });
      } else {
        alert('訓練家代碼已複製到剪貼簿！');
      }
    } catch (err) {
      console.error('複製失敗:', err);
      // 備用複製方法
      const textArea = document.createElement('textarea');
      textArea.value = trainer.id;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('訓練家代碼已複製到剪貼簿！');
    }
  };

  // 格式化顯示訓練家代碼
  const formattedCode = formatTrainerCode(trainer.id);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 max-w-sm mx-auto transform hover:scale-105 transition-transform duration-300">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {trainer.name}
        </h2>
        
        <div 
          className="bg-gray-100 rounded-lg p-3 mb-4 cursor-pointer hover:bg-gray-200 transition-colors"
          onClick={copyToClipboard}
          title="點擊複製訓練家代碼"
        >
          <p className="text-sm text-gray-600 mb-1">訓練家代碼</p>
          <p className="text-lg font-mono font-semibold text-blue-600">
            {formattedCode}
          </p>
          {!isValidCode && (
            <p className="text-xs text-red-500 mt-1">
              ⚠ 代碼格式可能不正確 (應為12位數字)
            </p>
          )}
          <p className="text-xs text-gray-400 mt-1">點擊複製</p>
        </div>

        <div className="flex justify-center">
          {loading ? (
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : qrCode ? (
            <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
              <img 
                src={qrCode} 
                alt={`${trainer.name} 的好友邀請 QR Code`}
                className="w-40 h-40"
                style={{ imageRendering: 'pixelated' }}
              />
              {!isValidCode && (
                <p className="text-xs text-orange-500 mt-2 text-center">
                  QR Code 可能無法正常運作
                </p>
              )}
            </div>
          ) : (
            <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">無法產生 QR Code</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p className="mb-1">掃描 QR Code 快速加好友</p>
          <p>或點擊代碼複製到 Pokémon GO</p>
        </div>
      </div>
    </div>
  );
}
