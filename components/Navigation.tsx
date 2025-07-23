import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white/10 backdrop-blur-sm mb-8" role="navigation" aria-label="主要導航">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/PokemonGOFriend" 
            className="text-white font-bold text-xl hover:text-white/80 transition-colors"
            aria-label="回到首頁"
          >
            🎮 Pokémon GO 好友
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              href="/PokemonGOFriend" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              aria-label="瀏覽好友列表"
            >
              好友列表
            </Link>
            <Link 
              href="/PokemonGOFriend/about" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              aria-label="了解更多關於我們"
            >
              關於我們
            </Link>
            <Link 
              href="/PokemonGOFriend/privacy" 
              className="text-white/80 hover:text-white transition-colors text-sm font-medium"
              aria-label="查看隱私政策"
            >
              隱私政策
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
