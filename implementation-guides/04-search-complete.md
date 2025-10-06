# 実装課題4: 検索機能（フィルタリング＆モーダル）

## Claude Codeへの実装プロンプト

```
ポケモン検索機能を完成させてください。
検索モーダルでポケモン名を入力し、日本語・英語の両方で部分一致検索ができる機能です。

## 実装場所
1. src/app/page.tsx - useEffect（フィルタリング処理）
2. src/components/SearchModal.tsx - 3つの処理関数とUI

## 機能要件
1. 検索ワードに基づいてポケモンリストをフィルタリング
2. 日本語名・英語名の両方で部分一致検索
3. 大文字小文字を区別しない
4. 検索モーダルでの入力と実行
5. Enterキーでも検索実行可能

## 実装仕様

### Part 1: フィルタリング処理（src/app/page.tsx）

#### useEffectの実装
依存配列: [allLoadedPokemon, searchTerm, selectedPokemon, handlePokemonSelect]

#### 処理フロー

1. **前提条件のチェック**
   ```javascript
   if (allLoadedPokemon.length > 0) {
     // フィルタリング処理
   }
   ```

2. **フィルタリング処理**
   ```javascript
   const filtered = searchTerm
     ? allLoadedPokemon.filter(pokemon => {
         // マッチング処理
       })
     : allLoadedPokemon;
   ```

3. **マッチング条件の実装**
   ```javascript
   const englishMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
   const japaneseMatch = pokemon.japaneseName?.toLowerCase().includes(searchTerm.toLowerCase());
   return englishMatch || japaneseMatch;
   ```
   - 英語名と日本語名の両方をチェック
   - オプショナルチェーン（?.）で日本語名の存在確認
   - OR条件でどちらかマッチすればOK

4. **結果の保存と自動選択**
   ```javascript
   setFilteredPokemon(filtered);

   // 最初のポケモンを自動選択
   if (filtered.length > 0 && !selectedPokemon) {
     handlePokemonSelect(filtered[0].url);
   }
   ```

#### 完成形
```javascript
useEffect(() => {
  if (allLoadedPokemon.length > 0) {
    const filtered = searchTerm
      ? allLoadedPokemon.filter(pokemon => {
          const englishMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
          const japaneseMatch = pokemon.japaneseName?.toLowerCase().includes(searchTerm.toLowerCase());
          return englishMatch || japaneseMatch;
        })
      : allLoadedPokemon;

    setFilteredPokemon(filtered);

    if (filtered.length > 0 && !selectedPokemon) {
      handlePokemonSelect(filtered[0].url);
    }
  }
}, [allLoadedPokemon, searchTerm, selectedPokemon, handlePokemonSelect]);
```

### Part 2: SearchModal.tsx - 処理関数

#### 1. handleSearch関数（検索実行）
```javascript
const handleSearch = () => {
  if (searchTerm.trim()) {
    onSearch(searchTerm.trim());
    setSearchTerm("");
    onOpenChange(false);
  }
};
```
- trim()で前後の空白削除
- 空でない場合のみ実行
- 検索実行→入力クリア→モーダル閉じる

#### 2. handleKeyDown関数（Enterキー処理）
```javascript
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};
```
- Enterキーで検索実行

#### 3. handleClose関数（キャンセル処理）
```javascript
const handleClose = () => {
  setSearchTerm("");
  onOpenChange(false);
};
```
- 入力クリア→モーダル閉じる

### Part 3: SearchModal.tsx - UI実装

#### 入力フィールド
```jsx
<div className="flex items-center gap-2">
  <Input
    id="search"
    placeholder="ポケモン名を入力..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onKeyDown={handleKeyDown}
    className="flex-1"
    autoFocus
  />
</div>
```

#### ボタン群
```jsx
<div className="flex justify-end gap-2">
  <Button
    variant="outline"
    onClick={handleClose}
    className="gap-2"
  >
    <X className="h-4 w-4" />
    キャンセル
  </Button>
  <Button
    onClick={handleSearch}
    disabled={!searchTerm.trim()}
    className="gap-2"
  >
    <Search className="h-4 w-4" />
    検索
  </Button>
</div>
```

## 実装のポイント
- toLowerCase()で大文字小文字を区別しない検索
- includes()で部分一致検索
- オプショナルチェーン（?.）で安全なプロパティアクセス
- trim()で空白文字の適切な処理
- 制御コンポーネントパターン（value + onChange）
- autoFocusでユーザビリティ向上

## 期待される動作の流れ
1. 検索アイコンクリック → モーダル開く
2. 自動的に入力欄にフォーカス
3. ポケモン名入力（例: "ピカ"、"pika"）
4. Enterまたは検索ボタンで実行
5. モーダルが閉じる
6. リストがフィルタリングされる
7. 最初のポケモンが自動選択される

## テストケース
- 日本語検索: "ピカチュウ" → ピカチュウが表示
- 部分一致: "ピカ" → ピカチュウが表示
- 英語検索: "pikachu" → ピカチュウが表示
- 大文字: "PIKACHU" → ピカチュウが表示
- 空検索: "" → 全ポケモン表示
- 該当なし: "xyz" → 0件表示

## 動作確認
1. 検索アイコンでモーダルが開くことを確認
2. 日本語で検索できることを確認
3. 英語で検索できることを確認
4. 部分一致で検索できることを確認
5. Enterキーで検索実行できることを確認
6. 空欄で検索ボタンが無効化されることを確認
7. キャンセルボタンでモーダルが閉じることを確認
8. 検索後にリストが正しくフィルタリングされることを確認
```