# github-pr-info プロジェクト仕様

## プロジェクト概要

現在の Git ブランチに関連する GitHub Pull Request 情報を取得・表示する CLI ツール。

## ファイル構成

```
src/
├── index.ts       # エントリポイント
├── git.ts         # Git情報取得
├── pr.ts          # GitHub PR情報取得
├── cache.ts       # キャッシュ管理
└── utils/
    ├── result.ts  # エラーハンドリング
    └── debug.ts   # デバッグ出力
```

## 技術仕様

- ランタイム: Bun
- 言語: TypeScript
- 依存: GitHub CLI (`gh`)
- キャッシュ: ファイルベース（JSON）
- ビルドツール: なし（Bun で直接実行）
