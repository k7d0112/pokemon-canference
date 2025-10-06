# 実装課題2: ポケモン詳細表示UI

## Claude Codeへの実装プロンプト

```
ポケモン詳細モーダルのUI表示機能を実装してください。
ポケモンのタイプとステータスを視覚的に表示する機能です。

## 実装場所
- ファイル: src/components/PokemonDetailModal.tsx
- 実装箇所: TODO: 実装課題2のコメント部分

## 機能要件
1. ポケモンのタイプを色付きバッジで表示
2. 各タイプは専用の色で視覚的に識別
3. ステータス（HP、攻撃力など）をプログレスバーで表示
4. すべて日本語表記で統一

## 実装仕様

### Part 1: タイプ表示UI

#### 実装内容
ポケモンが持つタイプ（炎、水、草など）を色付きのバッジで表示します。

#### UI構造
1. **全体のコンテナ**
   ```jsx
   <div className="text-center">
     {/* 中身 */}
   </div>
   ```

2. **ラベル表示**
   ```jsx
   <p className="mb-2">タイプ</p>
   ```

3. **タイプバッジのコンテナ**
   ```jsx
   <div className="flex justify-center gap-2">
     {/* タイプバッジ */}
   </div>
   ```

4. **タイプのループ処理**
   - pokemon.types配列をmapでループ
   - 各タイプごとにBadgeコンポーネントを生成

5. **Badgeコンポーネントの実装**
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

#### 使用する関数
- getTypeColor: タイプに応じた背景色を取得（例: fire→赤系）
- getTypeNameInJapanese: タイプ名を日本語に変換（例: fire→ほのお）

### Part 2: ステータス表示UI

#### 実装内容
ポケモンの能力値（HP、攻撃、防御など）をプログレスバーで視覚的に表示します。

#### UI構造
1. **全体のコンテナ**
   ```jsx
   <div>
     {/* 中身 */}
   </div>
   ```

2. **ラベル表示**
   ```jsx
   <p className="mb-3 text-center">ベースステータス</p>
   ```

3. **ステータスリストのコンテナ**
   ```jsx
   <div className="space-y-3">
     {/* ステータス項目 */}
   </div>
   ```

4. **ステータスのループ処理**
   ```jsx
   {pokemon.stats.map((stat) => {
     const statName = getStatNameInJapanese(stat.stat.name);

     return (
       <div key={stat.stat.name} className="space-y-1">
         {/* ステータス項目の中身 */}
       </div>
     );
   })}
   ```

5. **各ステータス項目の実装**
   ```jsx
   // ステータス名と数値の表示
   <div className="flex justify-between">
     <span>{statName}</span>
     <span>{stat.base_stat}</span>
   </div>

   // プログレスバー
   <Progress
     value={(stat.base_stat / getStatMaxValue(stat.stat.name)) * 100}
     className="h-2"
   />
   ```

#### 使用する関数
- getStatNameInJapanese: ステータス名を日本語化（例: hp→HP、attack→こうげき）
- getStatMaxValue: 各ステータスの理論最大値を取得（パーセンテージ計算用）

### 実装の全体像

最終的に以下のような構造になります：

```jsx
{/* タイプ表示 */}
<div className="text-center">
  <p className="mb-2">タイプ</p>
  <div className="flex justify-center gap-2">
    {/* pokemon.typesをmapでループしてBadge表示 */}
  </div>
</div>

{/* 基本情報（身長・体重）はそのまま */}

{/* ステータス表示 */}
<div>
  <p className="mb-3 text-center">ベースステータス</p>
  <div className="space-y-3">
    {/* pokemon.statsをmapでループして各ステータス表示 */}
  </div>
</div>
```

## 使用するコンポーネント
- Badge: shadcn/uiのバッジコンポーネント（タイプ表示用）
- Progress: shadcn/uiのプログレスバー（ステータス表示用）

## 実装のポイント
- mapメソッドには必ずkey属性を設定
- styleプロパティは二重波括弧 {{ }} で囲む
- 日本語表記の関数を適切に使用
- プログレスバーのvalue計算は0-100の範囲

## 期待される表示
1. タイプ:
   - 各タイプが専用の色のバッジで表示
   - 日本語名で表示（例: ほのお、みず）
   - 複数タイプの場合は横並びで表示

2. ステータス:
   - 各ステータスが日本語名で表示
   - 数値が右側に表示
   - プログレスバーで視覚的に能力値を表現
   - HPが高いポケモンはバーが長く、低いポケモンは短く表示

## 動作確認
1. モーダルを開いてタイプが色付きで表示されることを確認
2. タイプ名が日本語になっていることを確認
3. ステータス名が日本語になっていることを確認
4. プログレスバーが適切な長さで表示されることを確認
5. 複数タイプのポケモンで正しく表示されることを確認
```