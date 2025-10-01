# 実装課題5: データ取得・キャッシュ管理機能

## Claude Codeへのプロンプト

```
PokeAPIからポケモンリストを取得する関数を実装してください。

TODOコメントがある以下の箇所を実装してください：
src/api/pokemon.api.ts の getPokemonList関数

実装要件：

【getPokemonList関数】
実装箇所：「TODO: 実装課題5 - API通信処理」

関数の実装：
async getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const qs = new URLSearchParams({
    limit: String(limit),
    offset: String(offset)
  });
  return this.fetchAPI<PokemonListResponse>(`/pokemon?${qs.toString()}`);
}

実装のポイント：
1. URLSearchParamsを使ってクエリパラメータを構築
   - limitとoffsetは数値型なのでString()で文字列に変換

2. fetchAPIメソッドを使用
   - ジェネリクスでPokemonListResponse型を指定
   - パスは `/pokemon?${qs.toString()}`
   - fetchAPIメソッドが内部でエラーハンドリングとキャッシュを処理

3. 戻り値
   - fetchAPIの結果をそのままreturnする
   - 型はPromise<PokemonListResponse>

注意：
- fetchAPIメソッドは既にクラス内に定義済み
- エラーハンドリングはfetchAPI内で実装されているため不要
- キャッシュ設定もfetchAPI内で設定済み
```