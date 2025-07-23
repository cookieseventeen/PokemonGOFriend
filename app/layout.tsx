import type { Metadata } from 'next';
import '@/styles/globals.css';
import Script from 'next/script';
import Navigation from '@/components/Navigation';

export const metadata: Metadata = {
  title: {
    default: 'Pokémon GO 好友列表 - 快速加好友 QR Code 分享平台',
    template: '%s | Pokémon GO 好友列表'
  },
  description: '最完整的 Pokémon GO 好友 QR Code 分享平台！快速掃描 QR Code 加好友，與全球訓練家交換寶可夢、送禮物、一起 Raid。立即加入我們的好友網路！',
  keywords: [
    'Pokémon GO',
    '寶可夢GO',
    '好友',
    'QR Code',
    '訓練家',
    '加好友',
    '交換',
    '禮物',
    'Raid',
    '寶可夢',
    'Pokemon',
    '朋友代碼',
    '邀請碼'
  ],
  authors: [{ name: 'Pokémon GO 好友列表' }],
  creator: 'Pokémon GO 好友列表',
  publisher: 'Pokémon GO 好友列表',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cookieseventeen.github.io'),
  alternates: {
    canonical: '/PokemonGOFriend',
  },
  openGraph: {
    title: 'Pokémon GO 好友列表 - 快速加好友 QR Code 分享平台',
    description: '最完整的 Pokémon GO 好友 QR Code 分享平台！快速掃描 QR Code 加好友，與全球訓練家交換寶可夢、送禮物、一起 Raid。',
    url: 'https://cookieseventeen.github.io/PokemonGOFriend',
    siteName: 'Pokémon GO 好友列表',
    images: [
      {
        url: 'https://cookieseventeen.github.io/PokemonGOFriend/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Pokémon GO 好友列表 - 快速加好友平台',
      },
    ],
    locale: 'zh_TW',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pokémon GO 好友列表 - 快速加好友 QR Code 分享平台',
    description: '最完整的 Pokémon GO 好友 QR Code 分享平台！快速掃描 QR Code 加好友，與全球訓練家交換寶可夢、送禮物、一起 Raid。',
    images: ['https://cookieseventeen.github.io/PokemonGOFriend/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 根據環境決定 basePath
  const basePath = process.env.NODE_ENV === 'production' ? '/PokemonGOFriend' : '';
  
  return (
    <html lang="zh-TW">
      <head>
        {/* 預設 SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="zh-TW" />
        <meta name="revisit-after" content="7 days" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* 網站圖示 */}
        <link rel="icon" href="./favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
        <link rel="manifest" href="./site.webmanifest" />
        
        {/* 預載入重要資源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD 結構化資料 */}
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Pokémon GO 好友列表",
              "description": "最完整的 Pokémon GO 好友 QR Code 分享平台",
              "url": "https://cookieseventeen.github.io/PokemonGOFriend",
              "sameAs": [],
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://cookieseventeen.github.io/PokemonGOFriend?search={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Pokémon GO 好友列表"
              }
            }
          `}
        </Script>

        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-W6VJ080652"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-W6VJ080652');
          `}
        </Script>
      </head>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
