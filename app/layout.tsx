import type { Metadata } from 'next';
import '@/styles/globals.css';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Pokémon GO 好友列表',
  description: '掃描 QR Code 快速加好友',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <head>
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
      <body>{children}</body>
    </html>
  );
}
