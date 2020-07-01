// commander モジュールを program としてインポートする
const program = require("commander");
// fs モジュールを fs オブジェクトとしてインポートする
const fs = require("fs");
// marked モジュールを marked オブジェクトとしてインポートする
const marked = require("marked");
// md2html モジュールをインポートする
const md2html = require("./md2html");

// gfm オプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数を commander でパースする
program.parse(process.argv);
// オプションのパース結果をオブジェクトとして取得する
const opts = program.opts();
// ファイルパスを program.args から取り出す
const filePath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
  gfm: false,
  ...opts,
};

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.error(err.message);
    // 終了ステータス1 (一般的なエラー) としてプロセス終了する
    process.exit(1);
  }
  // HACK: spread 構文で `gfm` を上書きしている
  const html = md2html(file, cliOptions);
  console.log(html);
});
