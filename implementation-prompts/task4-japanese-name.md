# 実装課題4: 日本語化・国際化対応機能

## Claude Codeへのプロンプト

```
ポケモンの日本語名を取得する関数を実装してください。

TODOコメントがある以下の箇所を実装してください：
src/services/pokemonService.ts の getPokemonNameInJapanese関数

実装要件：

【getPokemonNameInJapanese関数】
実装箇所：「TODO: 実装課題4 - 日本語名取得とキャッシュ処理」

関数の実装手順：
1. キャッシュチェック
   - const cached = this.nameCache.get(idOrName)
   - if (cached) return cached

2. APIからデータ取得（try-catch）
   try {
     - const species = await pokemonAPI.getPokemonSpecies(idOrName)
     - const japaneseName = species.names.find(name => name.language.name === "ja")?.name
     - const result = japaneseName || `${idOrName}`（日本語名がない場合はIDまたは名前を使用）
     - this.nameCache.set(idOrName, result) でキャッシュに保存
     - return result
   }

3. エラーハンドリング
   catch (error) {
     - console.error(`Failed to get Japanese name for ${idOrName}:`, error)
     - const fallback = `${idOrName}`（フォールバック値）
     - this.nameCache.set(idOrName, fallback, 60 * 60 * 1000)（1時間のTTLでキャッシュ）
     - return fallback
   }

ポイント：
- nameCache は既に定義済みのプライベートプロパティ
- pokemonAPI は既にインポート済み
- キャッシュは成功時はデフォルトTTL、エラー時は1時間
```