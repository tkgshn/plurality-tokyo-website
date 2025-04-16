import withMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      // llms.txt仕様に対応するためのリライトルール
      // .html.mdへのリクエストをmdxファイルへリダイレクト
      {
        source: '/:path*.html.md',
        destination: '/api/md-version?path=:path*',
      },
    ];
  },
  // ビルド後に実行するカスタムコマンド
  webpack: (config, { dev, isServer }) => {
    // 本番ビルド時のみ実行
    if (!dev && isServer) {
      // ビルド後にllms.txt生成スクリプトを実行するように設定
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        // ビルド完了後にスクリプトを実行
        if (entries['main.js'] && !entries['main.js'].includes('scripts/generate-llms-txt.js')) {
          if (Array.isArray(entries['main.js'])) {
            entries['main.js'].push('scripts/generate-llms-txt.js');
          } else {
            entries['main.js'] = [entries['main.js'], 'scripts/generate-llms-txt.js'];
          }
        }
        return entries;
      };
    }
    return config;
  },
}

export default withMDX()(nextConfig)
