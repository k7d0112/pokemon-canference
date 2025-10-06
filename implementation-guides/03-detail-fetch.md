# 実装課題3: ポケモン詳細取得

## Claude Codeへの実装プロンプト

```
ポケモンリストから選択したポケモンの詳細情報を取得する機能を実装してください。
クリックしたポケモンの詳細データをAPIから取得して表示します。

## 実装場所
- ファイル: src/app/page.tsx
- 関数名: handlePokemonSelect

## 機能要件
1. リストのポケモンをクリックすると詳細データを取得
2. 日本語名を含む詳細情報を取得
3. ローディング中は適切な表示
4. エラーが発生してもアプリは継続動作

## 実装仕様

### 関数の設定
- useCallbackでメモ化（レンダリング最適化）
- 依存配列は空配列 []
- パラメータ: pokemonUrl（string型）

### 処理フロー

#### 1. 非同期処理の基本構造
```javascript
const handlePokemonSelect = useCallback(async (pokemonUrl: string) => {
  try {
    // 成功時の処理
  } catch (error) {
    // エラー処理
  } finally {
    // 後処理
  }
}, []);
```

#### 2. 詳細な実装手順

**tryブロック内の処理:**

1. **ローディング開始**
   - setLoadingDetail(true)
   - メイン表示エリアにローディング表示が出る

2. **選択状態の保存**
   - setSelectedPokemonUrl(pokemonUrl)
   - リスト内で選択中のポケモンがハイライトされる

3. **ポケモンIDの抽出**
   - pokemonService.extractIdFromResourceUrl(pokemonUrl)を使用
   - URLからポケモンの数値IDを抽出
   - 例: "https://pokeapi.co/api/v2/pokemon/25/" → 25

4. **ID検証**
   - if (!pokemonId) throw new Error('Invalid Pokemon URL')
   - IDが取得できない場合はエラーをスロー

5. **詳細データ取得**
   - pokemonService.getPokemonDetailWithJapaneseName(pokemonId)
   - このメソッドは内部で以下を実行:
     - 基本的な詳細データを取得
     - 日本語名を取得
     - 両方を結合して返す

6. **データ保存**
   - setSelectedPokemon(pokemonDetail)
   - 取得したデータをstateに保存
   - UIが自動的に更新される

**catchブロック内の処理:**
- console.error('ポケモン詳細の取得に失敗しました:', error)
- エラーをコンソールに出力
- ユーザーには見えないが、デバッグに使用

**finallyブロック内の処理:**
- setLoadingDetail(false)
- 成功・失敗に関わらずローディング終了

### 実装の完成形

```javascript
const handlePokemonSelect = useCallback(async (pokemonUrl: string) => {
  try {
    setLoadingDetail(true);
    setSelectedPokemonUrl(pokemonUrl);
    const pokemonId = pokemonService.extractIdFromResourceUrl(pokemonUrl);
    if (!pokemonId) throw new Error('Invalid Pokemon URL');
    const pokemonDetail = await pokemonService.getPokemonDetailWithJapaneseName(pokemonId);
    setSelectedPokemon(pokemonDetail);
  } catch (error) {
    console.error('ポケモン詳細の取得に失敗しました:', error);
  } finally {
    setLoadingDetail(false);
  }
}, []);
```

## 使用する要素
- pokemonService: APIとの通信を担当するサービス
  - extractIdFromResourceUrl: URLからIDを抽出
  - getPokemonDetailWithJapaneseName: 詳細データと日本語名を取得
- setLoadingDetail: 詳細表示のローディング状態を管理
- setSelectedPokemonUrl: 選択されたポケモンのURLを管理
- setSelectedPokemon: 選択されたポケモンの詳細データを管理

## 実装のポイント
- useCallbackの依存配列は空配列を維持（再作成を防ぐ）
- エラーハンドリングで不正なURLにも対応
- finallyでローディング状態を確実に解除
- 非同期処理は必ずtry-catchで囲む

## 期待される動作
1. リストのポケモンをクリック
2. メイン表示エリアにローディング表示
3. 選択したポケモンがリスト内でハイライト
4. ポケモンの画像と名前が大きく表示
5. エラーが発生してもアプリは動作継続
6. ローディングは必ず終了する

## エラーケース
- 不正なURL形式の場合
- ネットワークエラーの場合
- APIがダウンしている場合
→ いずれもエラーログを出力し、アプリは継続動作

## 動作確認
1. 任意のポケモンをクリック
2. ローディング表示が出ることを確認
3. ポケモンの詳細が表示されることを確認
4. リスト内で選択状態がハイライトされることを確認
5. 別のポケモンをクリックして切り替わることを確認
6. コンソールにエラーが出ていないことを確認
```