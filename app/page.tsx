'use client';

import { useEffect, useState } from 'react';
import { Trainer } from '@/types/trainer';
import { getTrainersData } from '@/lib/sheets';
import TrainerCard from '@/components/TrainerCard';

export default function HomePage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    async function loadData() {
      try {
        console.log('開始載入訓練家資料...');
        const data = await getTrainersData();
        console.log('成功載入訓練家資料:', data);
        setTrainers(data);
      } catch (err) {
        console.error('載入資料失敗:', err);
        setError('無法載入訓練家資料');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">載入訓練家資料中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-300 text-lg mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            重新載入
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Pokémon GO 好友列表
          </h1>
          <p className="text-white/80 text-lg">
            掃描 QR Code 快速加好友
          </p>
        </header>

        {trainers.length === 0 ? (
          <div className="text-center">
            <p className="text-white text-lg">目前沒有訓練家資料</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
              <TrainerCard 
                key={`${trainer.id}-${index}`} 
                trainer={trainer} 
              />
            ))}
          </div>
        )}

        <footer className="text-center mt-12">
          <p className="text-white/60 text-sm">
            資料來源：Google Sheets | 總共 {trainers.length} 位訓練家
          </p>
        </footer>
      </div>
    </div>
  );
}
