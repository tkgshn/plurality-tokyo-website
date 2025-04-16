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
      const originalEmit = config.output.futureEmitAssets;
      config.output.futureEmitAssets = async function(compilation) {
        await originalEmit.apply(this, arguments);
        try {
          // build完了後にllms.txt生成スクリプトを実行
          console.log('Running llms.txt generator script...');
          const { execSync } = require('child_process');
          execSync('node scripts/generate-llms-txt.js', { stdio: 'inherit' });
        } catch (error) {
          console.error('Error running llms.txt generator:', error);
        }
      };
    }
    return config;
  },
}

export default withMDX()(nextConfig)
