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
        </div>
      </div>
    </nav>
  );
}
