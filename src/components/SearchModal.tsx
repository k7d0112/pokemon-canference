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

  // TODO: 実装課題6 - 検索実行処理
  // ここに検索実行の処理を実装してください
  // 要件:
  // - searchTerm.trim()が空でない場合のみ実行
  // - onSearch(searchTerm.trim())を呼ぶ
  // - setSearchTerm("")で入力をクリア
  // - onOpenChange(false)でモーダルを閉じる
  const handleSearch = () => {
    // ここに実装
  };

  // TODO: 実装課題6 - Enterキー処理
  // ここにEnterキーが押された時の処理を実装してください
  // 要件:
  // - e.key === "Enter"の場合にhandleSearch()を呼ぶ
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // ここに実装
  };

  // TODO: 実装課題6 - キャンセル処理
  // ここにキャンセルボタンの処理を実装してください
  // 要件:
  // - setSearchTerm("")で入力をクリア
  // - onOpenChange(false)でモーダルを閉じる
  const handleClose = () => {
    // ここに実装
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
          {/* TODO: 実装課題6 - 検索入力フィールド */}
          {/* ここに検索入力フィールドを実装してください */}
          {/* 要件: */}
          {/* - Inputコンポーネントを使用 */}
          {/* - placeholder="ポケモン名を入力..." */}
          {/* - value={searchTerm} */}
          {/* - onChange={(e) => setSearchTerm(e.target.value)} */}
          {/* - onKeyDown={handleKeyDown} */}
          {/* - autoFocusを設定 */}

          {/* TODO: 実装課題6 - ボタン群 */}
          {/* ここにキャンセルボタンと検索ボタンを実装してください */}
          {/* 要件: */}
          {/* キャンセルボタン: */}
          {/* - variant="outline" */}
          {/* - onClick={handleClose} */}
          {/* - Xアイコン付き */}
          {/* 検索ボタン: */}
          {/* - onClick={handleSearch} */}
          {/* - disabled={!searchTerm.trim()} */}
          {/* - Searchアイコン付き */}
        </div>
      </DialogContent>
    </Dialog>
  );
}