import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: '關於我們',
  description: '了解 Pokémon GO 好友列表平台，我們致力於幫助訓練家建立友誼、交換寶可夢。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  const breadcrumbItems = [
    { name: '首頁', href: '/PokemonGOFriend' },
    { name: '關於我們', href: '/PokemonGOFriend/about' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            關於 Pokémon GO 好友列表
          </h1>
          <p className="text-white/80 text-lg">
            連結全球訓練家的好友平台
          </p>
        </header>

        <main className="space-y-8">
          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">我們的使命</h2>
            <p className="text-white/90 leading-relaxed mb-4">
              Pokémon GO 好友列表平台致力於為全球的 Pokémon GO 訓練家提供一個安全、便利的好友交流空間。
              我們相信透過友誼，每位訓練家都能在 Pokémon GO 的世界中獲得更豐富的體驗。
            </p>
          </section>

          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">平台特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-2">🔗 快速連結</h3>
                <p className="text-white/80 text-sm">
                  透過 QR Code 快速掃描，瞬間加入新好友
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">🌍 全球社群</h3>
                <p className="text-white/80 text-sm">
                  與來自世界各地的訓練家建立友誼
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">🔄 即時更新</h3>
                <p className="text-white/80 text-sm">
                  好友列表即時更新，隨時發現新朋友
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">📱 行動優化</h3>
                <p className="text-white/80 text-sm">
                  完美適配手機使用，隨時隨地加好友
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Pokémon GO 好友系統介紹</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">好友等級系統</h3>
                <ul className="text-white/80 text-sm space-y-1 list-disc list-inside">
                  <li>好朋友（1 天）- 可以交換寶可夢</li>
                  <li>超級朋友（7 天）- 交換費用降低，獲得攻擊加成</li>
                  <li>極限朋友（30 天）- 更大幅的交換費用降低</li>
                  <li>麻吉朋友（90 天）- 最大的交換費用降低和攻擊加成</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">好友功能</h3>
                <ul className="text-white/80 text-sm space-y-1 list-disc list-inside">
                  <li>交換寶可夢（包括異色和地區限定）</li>
                  <li>互送禮物獲得道具和星塵</li>
                  <li>參與遠距 Raid 團戰</li>
                  <li>在 Gym 和 Raid 戰鬥中獲得攻擊加成</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
