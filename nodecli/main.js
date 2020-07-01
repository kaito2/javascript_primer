// commander モジュールを program としてインポートする
program = require("commander");
// fs モジュールを fs オブジェクトとしてインポートする
fs = require("fs");

// コマンドライン引数を commander でパースする
program.parse(process.argv);
// ファイルパスを program.args から取り出す
const filePath = program.args[0];

// ファイルを非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
  if (err) {
    console.error(err.message);
    // 終了ステータス1 (一般的なエラー) としてプロセス終了する
    process.exit(1);
  }
  console.log(file);
});
