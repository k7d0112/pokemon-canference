# ポケモン図鑑アプリ - 実装課題

このドキュメントには、ポケモン図鑑アプリの主要機能を実装するための課題とプロンプトが含まれています。
各課題は独立して実装可能で、Claude Codeを使用して実装することを想定しています。

## 実装課題1: ポケモン一覧の追加読み込み機能

### 対象ファイル
- `src/app/page.tsx`

### 実装箇所
- `loadMorePokemon`関数
- 「もっと見る」ボタンのUI部分

### プロンプト例
```
ポケモン図鑑アプリで「もっと見る」ボタンの機能を実装してください。
要件は以下の通りです：

1. loadMorePokemon関数の実装
- 現在のポケモンリストの長さを取得
- pokemonServiceを使って次の24件を取得
- 既存のリストに新しいデータを追加
- ローディング状態を管理

2. 「もっと見る」ボタンのUI実装
- 151匹未満の場合のみボタンを表示
- ローディング中は「読み込み中...」とスピナーを表示
- ボタンクリックでloadMorePokemon関数を実行
```

## 実装課題2: ポケモン詳細表示機能

### 対象ファイル
- `src/components/PokemonDetailModal.tsx`

### 実装箇所
- ポケモンタイプ表示UI
- ステータス表示UI

### プロンプト例
```
PokemonDetailModalコンポーネントの詳細表示部分を実装してください。

1. ポケモンタイプ表示
- pokemon.typesをmapでループ処理
- Badgeコンポーネントを使用してタイプを表示
- getTypeColorでタイプ別の背景色を設定
- getTypeNameInJapaneseで日本語名を表示

2. ステータス表示
- pokemon.statsをmapでループ処理
- ステータス名をgetStatNameInJapaneseで日本語化
- Progressコンポーネントでプログレスバー表示
- getStatMaxValueで最大値を取得してパーセンテージ計算
```

## 実装課題3: ポケモン検索・フィルタリング機能

### 対象ファイル
- `src/app/page.tsx`

### 実装箇所
- 検索フィルタリング処理（useEffect）
- 検索結果表示とクリアボタンUI

### プロンプト例
```
ポケモン検索機能のフィルタリング処理を実装してください。

1. 検索フィルタリング処理
- searchTermがある場合のみフィルタリング実行
- 英語名（pokemon.name）と日本語名（pokemon.japaneseName）の両方で部分一致検索
- 大文字小文字を区別しない検索
- フィルタリング結果をsetFilteredPokemonで更新
- 検索結果の最初のポケモンを自動選択

2. 検索結果表示UI
- searchTermがある場合は「○○の検索結果:」を表示
- フィルタリングされたポケモン数を表示
- searchTermがある場合はクリアボタンを表示（Xアイコン付き）
- クリアボタンクリックでsetSearchTerm("")を実行
```

## 実装課題4: 日本語化・国際化対応機能

### 対象ファイル
- `src/services/pokemonService.ts`

### 実装箇所
- `getPokemonNameInJapanese`関数

### プロンプト例
```
ポケモンの日本語名を取得する関数を実装してください。
キャッシュ機能も含めて実装する必要があります。

要件：
1. キャッシュが存在する場合はそれを返す
2. pokemonAPI.getPokemonSpeciesでspecies情報を取得
3. species.namesからlanguage.nameが"ja"のものを探す
4. 取得した結果をキャッシュに保存（nameCache.set）
5. エラーハンドリング実装（エラー時はIDまたは名前をそのまま返す）
6. エラー時は1時間のTTLでキャッシュ
```

## 実装課題5: データ取得・キャッシュ管理機能

### 対象ファイル
- `src/api/pokemon.api.ts`

### 実装箇所
- `getPokemonList`関数

### プロンプト例
```
PokeAPIからポケモンリストを取得する関数を実装してください。

要件：
1. URLSearchParamsでlimitとoffsetをクエリパラメータに変換
2. fetchAPIメソッドを使って/pokemonエンドポイントへリクエスト
3. PokemonListResponse型のレスポンスを返す
4. エラーハンドリングはfetchAPIメソッド内で実装済み

実装のヒント：
- URLSearchParamsは{ limit: String(limit), offset: String(offset) }の形式で作成
- fetchAPIメソッドは内部でキャッシュやエラーハンドリングを行っている
```

## 実装のポイント

### 共通の注意事項
1. TypeScriptの型定義を正しく使用する
2. 既存のユーティリティ関数を活用する
3. エラーハンドリングを適切に実装する
4. UIは既存のコンポーネント（Button, Badge, Progressなど）を使用する

### テスト方法
1. `npm run dev`で開発サーバーを起動
2. 各機能が正しく動作することを確認
3. `npm run typecheck`で型チェックが通ることを確認
4. `npm run lint`でリントエラーがないことを確認

### 段階的実装アプローチ
1. まず1つの課題から始める
2. 実装後、動作確認を行う
3. 問題がなければ次の課題に進む
4. すべての課題を完了したら統合テストを行う