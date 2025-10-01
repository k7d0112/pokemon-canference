"use client";

import { Search } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { useSearch } from "@/contexts/SearchContext";

export function SearchHeader() {
  const { setSearchTerm, isSearchModalOpen, setIsSearchModalOpen } = useSearch();

  return (
    <>
      <button
        onClick={() => setIsSearchModalOpen(true)}
        className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
        aria-label="検索"
      >
        <Search className="w-6 h-6" />
      </button>

      <SearchModal
        open={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        onSearch={setSearchTerm}
      />
    </>
  );
}