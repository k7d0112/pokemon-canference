"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: (searchTerm: string) => void;
}

export function SearchModal({ open, onOpenChange, onSearch }: SearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // TODO: 実装課題4 - 検索モーダルの処理関数
  // 以下の3つの関数を実装してください：
  // 1. handleSearch: 検索実行処理
  // 2. handleKeyDown: Enterキーで検索実行
  // 3. handleClose: モーダルを閉じる処理

  const handleSearch = () => {
    // 検索実行処理
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Enterキー処理
  };

  const handleClose = () => {
    // キャンセル処理
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            ポケモン検索
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* TODO: 実装課題4 - 検索UI */}
          {/* 検索入力フィールドとボタンを実装 */}
          {/* InputコンポーネントとButtonコンポーネントを使用 */}
        </div>
      </DialogContent>
    </Dialog>
  );
}