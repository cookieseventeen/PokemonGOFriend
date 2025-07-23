import type { Metadata } from 'next';
import Breadcrumbs from '@/components/Breadcrumbs';

export const metadata: Metadata = {
  title: '隱私政策',
  description: 'Pokémon GO 好友列表平台的隱私政策，了解我們如何保護您的個人資料。',
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  const breadcrumbItems = [
    { name: '首頁', href: '/PokemonGOFriend' },
    { name: '隱私政策', href: '/PokemonGOFriend/privacy' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Breadcrumbs items={breadcrumbItems} />
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            隱私政策
          </h1>
          <p className="text-white/80 text-lg">
            最後更新：2025年7月23日
          </p>
        </header>

        <main className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">資料收集</h2>
            <p className="text-white/90 leading-relaxed">
              我們的平台主要用於分享 Pokémon GO 好友代碼。我們可能會收集以下類型的資訊：
            </p>
            <ul className="list-disc list-inside mt-3 text-white/80 space-y-2">
              <li>訓練家暱稱（公開顯示）</li>
              <li>好友代碼（公開顯示）</li>
              <li>網站使用統計（透過 Google Analytics）</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">資料使用</h2>
            <p className="text-white/90 leading-relaxed">
              收集的資料僅用於：
            </p>
            <ul className="list-disc list-inside mt-3 text-white/80 space-y-2">
              <li>提供好友代碼分享服務</li>
              <li>改善網站功能和使用者體驗</li>
              <li>分析網站使用情況</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">資料保護</h2>
            <p className="text-white/90 leading-relaxed">
              我們致力於保護您的個人資料安全，採取適當的技術和組織措施來防止未經授權的存取、使用或洩露。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">聯絡我們</h2>
            <p className="text-white/90 leading-relaxed">
              如果您對此隱私政策有任何疑問，請透過 GitHub 聯絡我們。
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}
