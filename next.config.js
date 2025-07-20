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
  distDir: 'out'
}

module.exports = nextConfig
