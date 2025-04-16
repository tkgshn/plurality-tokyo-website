/**
 * Plurality Tokyo LLMs.txt Generator Script
 *
 * このスクリプトは、ビルド時にllms.txtファイルを動的に生成します。
 * Next.jsのビルドプロセスに統合して使用します。
 */

// CommonJS形式でESMモジュールをロードするための処理
require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
});

// llmsText モジュールのインポート
const { writeLlmsTextFile } = require('../lib/llmsText');

async function main() {
  console.log('Generating llms.txt file...');

  try {
    await writeLlmsTextFile();
    console.log('llms.txt generation completed successfully.');
  } catch (error) {
    console.error('Error generating llms.txt:', error);
    process.exit(1);
  }
}

// スクリプトの実行
main();
