# 実装課題3: ポケモン検索・フィルタリング機能

## Claude Codeへのプロンプト

```
ポケモン検索機能のフィルタリング処理とUIを実装してください。

TODOコメントがある以下の2箇所を実装してください：
1. src/app/page.tsx の検索フィルタリング処理（useEffect内）
2. 検索結果表示とクリアボタンUI

実装要件：

【検索フィルタリング処理】
実装箇所：「TODO: 実装課題3 - 検索フィルタリング処理」

useEffect内の処理：
- allLoadedPokemon.length > 0 の場合のみ処理を実行
- searchTermの有無で処理を分岐：
  - searchTermがある場合：
    - allLoadedPokemon.filter()でフィルタリング
    - pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) で英語名マッチ
    - pokemon.japaneseName?.toLowerCase().includes(searchTerm.toLowerCase()) で日本語名マッチ
    - 英語名OR日本語名でマッチしたものを返す
  - searchTermがない場合：
    - allLoadedPokemonをそのまま使用
- setFilteredPokemon(filtered)で結果を設定
- filtered.length > 0 && !selectedPokemonの場合、handlePokemonSelect(filtered[0].url)を呼ぶ

【検索結果表示とクリアボタンUI】
実装箇所：「TODO: 実装課題3 - 検索結果表示とクリアボタンUI」

HTMLの構造を以下のように修正：
<div className="flex items-center gap-2">
  <p className="text-gray-700">
    {searchTerm && (
      <span className="text-sm text-gray-500">
        「{searchTerm}」の検索結果:
      </span>
    )}
    {filteredPokemon.length}匹のポケモン
  </p>
  {searchTerm && (
    <Button
      onClick={() => setSearchTerm("")}
      variant="ghost"
      size="sm"
      className="h-6 px-2 text-gray-500 hover:text-gray-700"
    >
      <X className="w-4 h-4 mr-1" />
      クリア
    </Button>
  )}
</div>

注意：Xアイコンはlucide-reactからインポート済み
```