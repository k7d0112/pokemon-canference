# 実装課題1: ポケモン一覧の取得と追加読み込み

## Claude Codeへの実装プロンプト

```
ポケモン図鑑アプリの一覧表示と追加読み込み機能を実装してください。
初期表示で24件、「もっと見る」ボタンで追加24件ずつ読み込む機能です。

## 実装場所
- ファイル: src/app/page.tsx
- 実装箇所:
  1. loadPokemonList関数（初期読み込み）
  2. loadMorePokemon関数（追加読み込み）
  3. 「もっと見る」ボタンUI

## 機能要件
1. アプリ起動時に自動的に最初の24件を取得して表示
2. 「もっと見る」ボタンクリックで追加24件を既存リストに追加
3. 最大151匹（第1世代）まで読み込み可能
4. ローディング中はボタンを無効化し、スピナーを表示

## 実装仕様

### Part 1: loadPokemonList関数（初期読み込み）

#### 処理フロー
1. **非同期処理の実装**
   - async/awaitパターンを使用
   - try-catch-finallyで適切なエラーハンドリング

2. **実装手順**
   - tryブロック開始
   - setLoading(true)でローディング開始
   - pokemonService.getPokemonList(24, 0)でデータ取得
     - 第1引数: 取得件数（24）
     - 第2引数: 開始位置（0）
   - 取得したデータをsetPokemonList(data)で保存

3. **エラーハンドリング**
   - catchブロックでエラーキャッチ
   - console.error('ポケモンリストの取得に失敗しました:!!!!', error)
   - エラーでもアプリは継続動作

4. **後処理**
   - finallyブロックでsetLoading(false)
   - 成功・失敗に関わらず必ずローディング解除

### Part 2: loadMorePokemon関数（追加読み込み）

#### 処理フロー
1. **前提条件**
   - if (!pokemonList) return;で早期リターン
   - データがない場合は処理しない

2. **実装手順**
   - tryブロック開始
   - setLoading(true)でローディング開始
   - 現在の件数を取得: const currentCount = pokemonList.results.length
   - pokemonService.getPokemonList(24, currentCount)で追加データ取得
     - offsetに現在の件数を指定

3. **データマージ処理**
   - setPokemonListで既存と新規データを結合
   - 関数型更新を使用: setPokemonList(prevList => ...)
   - 返すオブジェクト:
     ```javascript
     {
       ...newData, // メタ情報（next, previousなど）を更新
       results: [...(prevList?.results || []), ...newData.results] // 配列結合
     }
     ```

4. **エラーハンドリング**
   - catchブロックでエラーキャッチ
   - console.error('追加ポケモンの取得に失敗しました:', error)

5. **後処理**
   - finallyブロックでsetLoading(false)

### Part 3: 「もっと見る」ボタンUI

#### 実装要件
1. **表示条件（AND条件）**
   - pokemonListが存在する
   - pokemonList.results.length < 151

2. **UI構造**
   ```jsx
   {pokemonList && pokemonList.results.length < 151 && (
     <div className="text-center pt-4">
       <Button
         onClick={loadMorePokemon}
         disabled={loading}
         className="bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-300"
       >
         {/* ボタンの中身 */}
       </Button>
     </div>
   )}
   ```

3. **ボタンの中身**
   - loading時:
     ```jsx
     <>
       <Loader2 className="w-4 h-4 animate-spin mr-2" />
       読み込み中...
     </>
     ```
   - 通常時:
     ```jsx
     'もっと見る'
     ```

## 使用する要素
- pokemonService: APIとの通信サービス
- setLoading/loading: ローディング状態管理
- setPokemonList/pokemonList: ポケモンリスト管理
- Button: shadcn/uiのボタンコンポーネント
- Loader2: lucide-reactのローディングアイコン

## 実装のポイント
- スプレッド演算子（...）を使った配列・オブジェクトの結合
- オプショナルチェーン（?.）でnullチェック
- 関数型更新でprevListを使った安全な更新
- 条件付きレンダリング（&&）の活用

## 動作確認
1. ページ読み込み時に24件表示されることを確認
2. 「もっと見る」ボタンが表示されることを確認
3. ボタンクリックで追加24件が表示されることを確認
4. ローディング中はボタンが無効化され、スピナーが回ることを確認
5. 151件に達したらボタンが消えることを確認
6. コンソールにエラーが出ていないことを確認
```