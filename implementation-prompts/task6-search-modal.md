# 実装課題6: 検索モーダル機能

## Claude Codeへのプロンプト

```
ポケモン検索モーダルの実装を行います。検索アイコンをクリックするとモーダルが開き、
ポケモン名を入力して検索できる機能を実装してください。

TODOコメントがある以下のファイルを実装してください：
1. src/components/SearchHeader.tsx - 検索アイコンとモーダルの統合
2. src/components/SearchModal.tsx - 検索モーダルの実装

実装要件：

【SearchHeader.tsx】
■ 検索アイコンボタンの実装
- buttonタグを使用
- Searchアイコン（lucide-react）を配置（className="w-6 h-6"）
- onClick={() => setIsSearchModalOpen(true)}でモーダルを開く
- className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
- aria-label="検索"を設定

■ SearchModalコンポーネントの配置
- <SearchModal
    open={isSearchModalOpen}
    onOpenChange={setIsSearchModalOpen}
    onSearch={setSearchTerm}
  />

【SearchModal.tsx】
■ handleSearch関数の実装
const handleSearch = () => {
  if (searchTerm.trim()) {
    onSearch(searchTerm.trim());
    setSearchTerm("");
    onOpenChange(false);
  }
};

■ handleKeyDown関数の実装
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch();
  }
};

■ handleClose関数の実装
const handleClose = () => {
  setSearchTerm("");
  onOpenChange(false);
};

■ 検索入力フィールドの実装
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

■ ボタン群の実装
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

動作の流れ：
1. ヘッダーの検索アイコンをクリック
2. モーダルが開き、入力フィールドにフォーカス
3. ポケモン名を入力
4. EnterキーまたはO検索ボタンで検索実行
5. 検索ワードがコンテキスト経由でModernPokedexに伝わり、フィルタリングされる
6. モーダルが自動で閉じる
```