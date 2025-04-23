const fs = require('fs');
const path = require('path');
const https = require('https');
const glob = require('glob');
const matter = require('gray-matter');

/**
 * デフォルト画像をコピーする関数
 * @param {string} outputPath - 保存先のパス
 * @returns {Promise<void>}
 */
const copyDefaultImage = async (outputPath) => {
  return new Promise((resolve, reject) => {
    const defaultImagePath = path.join('public', 'images', 'default-avatar.png');
    if (!fs.existsSync(defaultImagePath)) {
      reject(new Error('デフォルト画像が見つかりません'));
      return;
    }

    fs.copyFile(defaultImagePath, outputPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

/**
 * 画像をダウンロードする関数
 * @param {string} url - ダウンロードする画像のURL
 * @param {string} outputPath - 保存先のパス
 * @returns {Promise<void>}
 */
const downloadImage = async (url, outputPath) => {
  return new Promise((resolve, reject) => {
    // URLの検証
    try {
      new URL(url);
    } catch (err) {
      reject(new Error(`無効なURL: ${url}`));
      return;
    }

    const request = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      followRedirect: true
    }, (response) => {
      // リダイレクトの処理
      if (response.statusCode === 301 || response.statusCode === 302) {
        const redirectUrl = response.headers.location;
        if (!redirectUrl) {
          reject(new Error(`リダイレクト先URLが見つかりません: ${url}`));
          return;
        }
        // リダイレクト先に対して再帰的に処理
        downloadImage(redirectUrl, outputPath)
          .then(resolve)
          .catch(reject);
        return;
      }

      if (response.statusCode === 200) {
        const file = fs.createWriteStream(outputPath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
        file.on('error', (err) => {
          fs.unlink(outputPath, () => reject(err));
        });
      } else {
        reject(new Error(`画像のダウンロードに失敗しました: ${response.statusCode} - ${url}\nResponse: ${JSON.stringify(response.headers, null, 2)}`));
      }
    });

    request.on('error', reject);
    request.end();
  });
};

/**
 * 著者ファイルを処理する関数
 * @returns {Promise<void>}
 */
const processAuthorFiles = async () => {
  try {
    // 出力ディレクトリの作成
    const outputDir = 'public/images/speakers';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
      console.log(`✅ 出力ディレクトリを作成しました: ${outputDir}`);
    }

    // エラーログファイルの準備
    const errorLogPath = path.join(outputDir, 'download-errors.log');
    const errorLog = [];

    // 著者のMarkdownファイルを取得
    const files = await glob.glob('content/authors/*.md');
    if (files.length === 0) {
      console.log('⚠️ 処理対象のファイルが見つかりませんでした');
      return;
    }

    console.log(`📝 ${files.length}件の著者ファイルを処理します...`);

    let successCount = 0;
    let errorCount = 0;
    let defaultImageCount = 0;

    for (const file of files) {
      if (!fs.existsSync(file)) {
        console.log(`⚠️ ファイルが見つかりません: ${file}`);
        errorCount++;
        continue;
      }

      const content = fs.readFileSync(file, 'utf8');
      const { data } = matter(content);

      if (!data.avatar_url) {
        console.log(`⚠️ ${file}: アバターURLが設定されていません`);
        continue;
      }

      if (!data.avatar_url.startsWith('http')) {
        console.log(`ℹ️ ${file}: すでにローカルパスが設定されています`);
        continue;
      }

      const fileName = path.basename(file, '.md') + path.extname(new URL(data.avatar_url).pathname);
      const outputPath = path.join(outputDir, fileName);

      try {
        await downloadImage(data.avatar_url, outputPath);
        console.log(`✅ ${data.title || fileName}の画像をダウンロードしました`);

        // Markdownファイルのパスを更新
        const newContent = content.replace(
          data.avatar_url,
          `/images/speakers/${fileName}`
        );
        fs.writeFileSync(file, newContent);
        console.log(`✅ ${file}のアバターURLを更新しました`);
        successCount++;
      } catch (err) {
        console.error(`❌ ${data.title || fileName}の画像ダウンロードに失敗しました:`, err.message);
        errorCount++;
        errorLog.push({
          title: data.title || fileName,
          file: file,
          url: data.avatar_url,
          error: err.message
        });

        // デフォルト画像を使用
        try {
          const defaultFileName = path.basename(file, '.md') + '.png';
          const defaultOutputPath = path.join(outputDir, defaultFileName);
          await copyDefaultImage(defaultOutputPath);
          console.log(`✅ ${data.title || fileName}にデフォルト画像を設定しました`);

          // Markdownファイルのパスを更新
          const newContent = content.replace(
            data.avatar_url,
            `/images/speakers/${defaultFileName}`
          );
          fs.writeFileSync(file, newContent);
          console.log(`✅ ${file}のアバターURLを更新しました（デフォルト画像）`);
          defaultImageCount++;
        } catch (defaultErr) {
          console.error(`❌ デフォルト画像の設定に失敗しました:`, defaultErr.message);
        }
      }
    }

    // エラーログの保存
    if (errorLog.length > 0) {
      fs.writeFileSync(errorLogPath, JSON.stringify(errorLog, null, 2));
      console.log(`\n❗ エラーログを保存しました: ${errorLogPath}`);
    }

    console.log('\n📊 処理結果:');
    console.log(`✅ 成功: ${successCount}件`);
    console.log(`🔄 デフォルト画像使用: ${defaultImageCount}件`);
    console.log(`❌ 失敗: ${errorCount - defaultImageCount}件`);

    if (errorCount > defaultImageCount) {
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ ファイル処理中にエラーが発生しました:', err);
    process.exit(1);
  }
};

// スクリプトの実行
console.log('🚀 画像ダウンロードスクリプトを開始します...');
processAuthorFiles().catch(err => {
  console.error('❌ 予期せぬエラーが発生しました:', err);
  process.exit(1);
});
