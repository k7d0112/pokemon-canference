# 実装課題1: ポケモン一覧の追加読み込み機能

## Claude Codeへのプロンプト

```
ポケモン図鑑アプリで「もっと見る」ボタンの追加読み込み機能を実装してください。

TODOコメントがある以下の箇所を実装してください：
1. src/app/page.tsx の loadMorePokemon関数
2. 同ファイルの「もっと見る」ボタンUI部分

実装要件：

【loadMorePokemon関数】
- pokemonListが存在しない場合は早期リターン
- try-catch-finallyでエラーハンドリング
- setLoading(true)でローディング開始
- 現在のポケモンリストの長さを取得（pokemonList.results.length）
- pokemonService.getPokemonList(24, currentCount)で次の24件を取得
- setPokemonListで既存のリストと新しいデータをマージ
  - スプレッド演算子を使って既存のresultsと新規resultsを結合
- エラー時はconsole.errorでログ出力
- finallyでsetLoading(false)

【もっと見るボタンUI】
- pokemonListが存在し、かつresults.lengthが151未満の場合のみ表示
- Buttonコンポーネントを使用
- loading中はdisabled
- loading中は「読み込み中...」とLoader2アイコンを表示
- 通常時は「もっと見る」を表示
- onClickでloadMorePokemon関数を呼ぶ
- スタイルは「bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300」
```