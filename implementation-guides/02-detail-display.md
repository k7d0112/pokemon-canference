# 実装課題2: ポケモン詳細表示UI

## Claude Codeへの実装プロンプト

```
ポケモン詳細モーダルの表示機能を実装してください。
実装課題1で基本的な一覧が動作している状態に、詳細情報の表示機能を追加します。

## 前提条件
- 実装課題1が完了していること（ポケモン一覧が表示されている）
- ポケモンをクリックして「i」ボタンでモーダルが開けること

## 実装場所
- ファイル: src/components/PokemonDetailModal.tsx
- 実装箇所: TODO: 実装課題2のコメント部分

## 機能要件
1. ポケモンのタイプを色付きバッジで視覚的に表示
2. ポケモンのステータス（HP、攻撃力など）をプログレスバーで表示
3. すべて日本語表記で統一された見やすいUI
4. タイプごとに適切な色分けがされた直感的なデザイン

## 完了後の動作
- ✅ モーダルでポケモンのタイプが色付きで表示される
- ✅ ステータスがプログレスバーで視覚的に表示される
- ✅ 日本語表記で統一された詳細情報が見られる

## 実装仕様

この実装では、既に用意されているユーティリティ関数を活用して、
美しい詳細表示UIを作成します。

### Part 1: タイプ表示UI

#### 目的と役割
ポケモンが持つタイプ（ほのお、みず、くさなど）を色付きのバッジで表示し、
ユーザーが一目でポケモンの属性を理解できるようにします。

#### 実装要件

**1. 全体のレイアウト構造**
- 中央寄せのレイアウトで統一感のあるデザイン
- 「タイプ」というラベルを表示して何の情報かを明確化
- タイプバッジを横並びで美しく配置

**2. 実装する構造**
```jsx
<div className="text-center">
  <p className="mb-2">タイプ</p>
  <div className="flex justify-center gap-2">
    {/* ここにタイプバッジのループ処理 */}
  </div>
</div>
```

**3. タイプバッジのループ処理**
- pokemon.types配列をmapメソッドでループ処理
- 各タイプごとにBadgeコンポーネントを生成
- 以下の仕様で実装:
  ```jsx
  {pokemon.types.map((typeInfo) => (
    <Badge
      key={typeInfo.type.name}
      style={{
        backgroundColor: getTypeColor(typeInfo.type.name),
        color: "white",
      }}
    >
      {getTypeNameInJapanese(typeInfo.type.name)}
    </Badge>
  ))}
  ```

**4. 使用する関数の役割**
- `getTypeColor(typeInfo.type.name)`: タイプに応じた背景色を取得
  - 例: fire → 赤系の色、water → 青系の色
- `getTypeNameInJapanese(typeInfo.type.name)`: 英語のタイプ名を日本語に変換
  - 例: fire → ほのお、water → みず

### Part 2: ステータス表示UI

#### 目的と役割
ポケモンの能力値（HP、攻撃、防御など）をプログレスバーで視覚的に表示し、
各ポケモンの強さを直感的に理解できるようにします。

#### 実装要件

**1. 全体のレイアウト構造**
- 「ベースステータス」というラベルで何の情報かを明確化
- 各ステータスを縦に並べて見やすく表示
- ステータス名と数値を左右に配置し、下にプログレスバーを表示

**2. 実装する構造**
```jsx
<div>
  <p className="mb-3 text-center">ベースステータス</p>
  <div className="space-y-3">
    {/* ここにステータスのループ処理 */}
  </div>
</div>
```

**3. ステータスのループ処理**
各ステータスごとに以下の情報を表示:
- ステータス名（日本語）
- 実際の数値
- 視覚的なプログレスバー

**実装手順:**
```jsx
{pokemon.stats.map((stat) => {
  const statName = getStatNameInJapanese(stat.stat.name);

  return (
    <div key={stat.stat.name} className="space-y-1">
      <div className="flex justify-between">
        <span>{statName}</span>
        <span>{stat.base_stat}</span>
      </div>
      <Progress
        value={(stat.base_stat / getStatMaxValue(stat.stat.name)) * 100}
        className="h-2"
      />
    </div>
  );
})}
```

**4. 使用する関数の役割**
- `getStatNameInJapanese(stat.stat.name)`: ステータス名を日本語化
  - 例: hp → HP、attack → こうげき、defense → ぼうぎょ
- `getStatMaxValue(stat.stat.name)`: 各ステータスの理論最大値を取得
  - プログレスバーのパーセンテージ計算に使用
  - 例: HPの最大値は255、攻撃の最大値は190など

**5. プログレスバーの計算**
- `(stat.base_stat / getStatMaxValue(stat.stat.name)) * 100`
- 実際の値を理論最大値で割って100を掛けることで0-100のパーセンテージに変換
- 例: HP150、最大値255の場合 → (150/255)*100 = 約59%

### 実装の全体像

最終的に以下のような構造になります：

```jsx
{/* タイプ表示セクション */}
<div className="text-center">
  <p className="mb-2">タイプ</p>
  <div className="flex justify-center gap-2">
    {pokemon.types.map((typeInfo) => (
      <Badge
        key={typeInfo.type.name}
        style={{
          backgroundColor: getTypeColor(typeInfo.type.name),
          color: "white",
        }}
      >
        {getTypeNameInJapanese(typeInfo.type.name)}
      </Badge>
    ))}
  </div>
</div>

{/* 基本情報（身長・体重）は既存のまま */}

{/* ステータス表示セクション */}
<div>
  <p className="mb-3 text-center">ベースステータス</p>
  <div className="space-y-3">
    {pokemon.stats.map((stat) => {
      const statName = getStatNameInJapanese(stat.stat.name);

      return (
        <div key={stat.stat.name} className="space-y-1">
          <div className="flex justify-between">
            <span>{statName}</span>
            <span>{stat.base_stat}</span>
          </div>
          <Progress
            value={(stat.base_stat / getStatMaxValue(stat.stat.name)) * 100}
            className="h-2"
          />
        </div>
      );
    })}
  </div>
</div>
```

## 使用するコンポーネントと関数
- **Badge**: shadcn/uiのバッジコンポーネント（タイプ表示用）
- **Progress**: shadcn/uiのプログレスバーコンポーネント（ステータス表示用）
- **getTypeColor**: タイプ別の色を取得する関数
- **getTypeNameInJapanese**: タイプ名の日本語化関数
- **getStatNameInJapanese**: ステータス名の日本語化関数
- **getStatMaxValue**: ステータスの理論最大値を取得する関数

## 実装時の重要なポイント
- **key属性**: mapメソッドを使う際は必ずkey属性を設定
- **スタイルオブジェクト**: styleプロパティは二重波括弧 `{{ }}` で囲む
- **日本語化関数**: 必ず適切な日本語化関数を使用
- **プログレスバーの計算**: 0-100の範囲になるよう適切に計算

## 期待される表示結果

**タイプ表示:**
- 各タイプが専用の色のバッジで表示される
- 日本語名で表示される（例: ほのお、みず、でんき）
- 複数タイプの場合は横並びで美しく配置される

**ステータス表示:**
- 各ステータスが日本語名で表示される
- 数値が右側に表示される
- プログレスバーで能力値が視覚的に表現される
- 高い能力値ほど長いバーで表示される

## 動作確認手順
実装完了後、以下を確認してください：

1. **モーダル表示の確認**
   - ポケモンをクリックして「i」ボタンでモーダルが開くことを確認

2. **タイプ表示の確認**
   - タイプが色付きバッジで表示されることを確認
   - タイプ名が日本語になっていることを確認
   - 複数タイプのポケモンで正しく表示されることを確認

3. **ステータス表示の確認**
   - 各ステータス名が日本語になっていることを確認
   - プログレスバーが適切な長さで表示されることを確認
   - 高いステータスほど長いバーになっていることを確認

4. **全体的な確認**
   - UIが美しく統一されていることを確認
   - 日本語表記で統一されていることを確認

これで、ポケモンの詳細情報を美しく表示する機能が完成します！
```