'use client';

import { useEffect, useState } from 'react';
import { Trainer, SortOrder } from '@/types/trainer';
import { getTrainersData } from '@/lib/sheets';
import TrainerCard from '@/components/TrainerCard';

export default function HomePage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [sortedTrainers, setSortedTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // 排序訓練家資料
  const sortTrainersByTime = (trainersToSort: Trainer[], order: SortOrder) => {
    return [...trainersToSort].sort((a, b) => {
      // 如果沒有時間戳記，使用加入順序（陣列索引）
      const timeA = a.timestamp ? new Date(a.timestamp).getTime() : trainers.indexOf(a);
      const timeB = b.timestamp ? new Date(b.timestamp).getTime() : trainers.indexOf(b);
      
      if (order === 'asc') {
        return timeA - timeB; // 舊到新（正序）
      } else {
        return timeB - timeA; // 新到舊（倒序）
      }
    });
  };

  // 切換排序順序
  const toggleSortOrder = () => {
    const newOrder: SortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setSortedTrainers(sortTrainersByTime(trainers, newOrder));
  };

  useEffect(() => {
    async function loadData() {
      try {
        console.log('開始載入訓練家資料...');
        const data = await getTrainersData();
        console.log('成功載入訓練家資料:', data);
        
        // 為沒有時間戳記的資料新增當前時間
        const dataWithTimestamp = data.map((trainer, index) => ({
          ...trainer,
          timestamp: trainer.timestamp || new Date().toISOString()
        }));
        
        setTrainers(dataWithTimestamp);
        setSortedTrainers(sortTrainersByTime(dataWithTimestamp, sortOrder));
      } catch (err) {
        console.error('載入資料失敗:', err);
        setError('無法載入訓練家資料');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 當排序順序改變時重新排序
  useEffect(() => {
    if (trainers.length > 0) {
      setSortedTrainers(sortTrainersByTime(trainers, sortOrder));
    }
  }, [sortOrder]);

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
            Pokémon GO 好友列表 - 快速加好友平台
          </h1>
          <h2 className="text-white/80 text-lg mb-4">
            掃描 QR Code 快速加好友，與全球訓練家交換寶可夢
          </h2>
          <p className="text-white/70 text-base max-w-2xl mx-auto">
            加入我們的 Pokémon GO 好友網路，與來自世界各地的訓練家成為好友！快速掃描 QR Code 即可加好友，
            一起交換寶可夢、互送禮物、參與 Raid 團戰。立即找到您的下一個 Pokémon GO 好友！
          </p>
        </header>

        {/* 說明區塊 */}
        <section className="mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-4xl mx-auto">
            <h3 className="text-white font-semibold text-xl mb-4 text-center">
              📋 相關連結與資訊
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium text-lg mb-2 flex items-center">
                  📝 好友表單
                </h4>
                <p className="text-white/70 text-sm mb-3">
                  想要新增您的好友代碼？填寫表單加入我們的好友列表！
                </p>
                <a 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeo1EZcUz3_dvvc4lcl0w_9P_sgGBbWki3M-n9g__oopzfBxA/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  填寫表單 ↗
                </a>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium text-lg mb-2 flex items-center">
                  📊 資料來源
                </h4>
                <p className="text-white/70 text-sm mb-3">
                  所有好友資料都來自 Google Sheets，即時更新同步。
                </p>
                <a 
                  href="https://docs.google.com/spreadsheets/d/1UpaoJ8s_cQvqTDamczEPzHGDHkvLNwTHnXbrWYkhYy8/edit?gid=473917600#gid=473917600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  查看資料表 ↗
                </a>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="text-white font-medium text-lg mb-2 flex items-center">
                  🎮 巴哈姆特
                </h4>
                <p className="text-white/70 text-sm mb-3">
                  感謝巴哈姆特大大提供的寶貴資訊與支援！
                </p>
                <a 
                  href="https://forum.gamer.com.tw/C.php?bsn=29659&snA=30808&tnum=6845&subbsn=6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  巴哈討論區 ↗
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* 排序控制項 */}
        {sortedTrainers.length > 0 && (
          <section className="flex justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">依時間排序：</span>
                <button
                  onClick={toggleSortOrder}
                  className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                  aria-label={`切換排序順序，目前為${sortOrder === 'asc' ? '最舊到最新' : '最新到最舊'}`}
                >
                  <span>{sortOrder === 'asc' ? '最舊到最新' : '最新到最舊'}</span>
                  <svg 
                    className={`w-4 h-4 transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        )}

        {sortedTrainers.length === 0 ? (
          <section className="text-center">
            <p className="text-white text-lg">目前沒有訓練家資料</p>
          </section>
        ) : (
          <main>
            <section 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              aria-label="訓練家好友列表"
            >
              {sortedTrainers.map((trainer, index) => (
                <TrainerCard 
                  key={`${trainer.id}-${index}`} 
                  trainer={trainer} 
                />
              ))}
            </section>
          </main>
        )}

        <footer className="text-center mt-12">
          <div className="bg-white/5 rounded-lg p-6 mb-6">
            <h3 className="text-white font-semibold text-lg mb-3">
              關於 Pokémon GO 好友系統
            </h3>
            <p className="text-white/70 text-sm mb-4 max-w-3xl mx-auto">
              在 Pokémon GO 中，好友系統讓您可以與其他訓練家建立連結。透過好友功能，您可以交換寶可夢、
              互送禮物、參與 Raid 團戰，並在戰鬥中獲得攻擊加成。使用我們的平台，您可以輕鬆找到新的好友，
              擴展您的 Pokémon GO 社交網路。
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-white/60 text-xs">
              <span>關鍵字：寶可夢GO加好友</span>
              <span>Pokemon GO朋友代碼</span>
              <span>訓練家交換</span>
              <span>QR Code掃描</span>
            </div>
          </div>
          <p className="text-white/60 text-sm">
            資料來源：Google Sheets | 總共 {sortedTrainers.length} 位訓練家
            {sortOrder === 'asc' ? ' | 排序：最舊到最新' : ' | 排序：最新到最舊'}
          </p>
        </footer>
      </div>
    </div>
  );
}
