/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // GitHub Pages 專用設定
  basePath: process.env.NODE_ENV === 'production' ? '/PokemonGOFriend' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/PokemonGOFriend/' : '',
  // 確保生成的檔案是靜態的
  distDir: 'out',
  
  // SEO 和效能優化配置
  compress: true,
  poweredByHeader: false,
  
  // 頭部標籤優化
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig
