"use client";

import { Search } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { useSearch } from "@/contexts/SearchContext";

export function SearchHeader() {
  const { setSearchTerm, isSearchModalOpen, setIsSearchModalOpen } = useSearch();

  return (
    <>
      {/* TODO: 実装課題6 - 検索アイコンボタン */}
      {/* ここに検索アイコンボタンを実装してください */}
      {/* 要件: */}
      {/* - Searchアイコン（lucide-react）を表示 */}
      {/* - クリックでsetIsSearchModalOpen(true)を呼ぶ */}
      {/* - aria-label="検索"を設定 */}
      {/* - ホバー時の背景色変更エフェクト */}

      {/* TODO: 実装課題6 - SearchModalコンポーネントの配置 */}
      {/* ここにSearchModalコンポーネントを配置してください */}
      {/* 要件: */}
      {/* - open={isSearchModalOpen} */}
      {/* - onOpenChange={setIsSearchModalOpen} */}
      {/* - onSearch={setSearchTerm} */}
    </>
  );
}