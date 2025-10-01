# 実装課題2: ポケモン詳細表示機能

## Claude Codeへのプロンプト

```
PokemonDetailModalコンポーネントの詳細表示部分を実装してください。

TODOコメントがある以下の2箇所を実装してください：
1. ポケモンタイプ表示UI
2. ステータス表示UI

実装要件：

【ポケモンタイプ表示UI】
実装箇所：「TODO: 実装課題2 - ポケモンタイプ表示UI」

HTMLの構造：
- 外側のdivにclassName="text-center"
- pタグで「タイプ」を表示（className="mb-2"）
- divタグでタイプバッジを横並び表示（className="flex justify-center gap-2"）
- pokemon.types.map()でループ処理
- Badgeコンポーネントを使用
  - key={typeInfo.type.name}
  - style={{ backgroundColor: getTypeColor(typeInfo.type.name), color: "white" }}
  - 中身はgetTypeNameInJapanese(typeInfo.type.name)

【ステータス表示UI】
実装箇所：「TODO: 実装課題2 - ステータス表示UI」

HTMLの構造：
- 外側のdiv
- pタグで「ベースステータス」を表示（className="mb-3 text-center"）
- divタグでステータスリスト（className="space-y-3"）
- pokemon.stats.map()でループ処理
  - まずgetStatNameInJapanese(stat.stat.name)でステータス名を取得
  - 各ステータスはdiv（key={stat.stat.name} className="space-y-1"）
  - 中に2つの要素：
    1. div（className="flex justify-between"）
       - span要素でstatName表示
       - span要素でstat.base_stat表示
    2. Progressコンポーネント
       - value={(stat.base_stat / getStatMaxValue(stat.stat.name)) * 100}
       - className="h-2"
```