import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pokémon GO 好友列表 - 快速加好友 QR Code 分享平台',
    short_name: 'Pokemon GO 好友',
    description: '最完整的 Pokémon GO 好友 QR Code 分享平台！快速掃描 QR Code 加好友',
    start_url: './',
    display: 'standalone',
    background_color: '#1e3a8a',
    theme_color: '#3b82f6',
    orientation: 'portrait',
    scope: './',
    lang: 'zh-TW',
    icons: [
      {
        src: './icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: './icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: './favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon'
      }
    ],
    categories: ['games', 'social', 'utilities']
  }
}
