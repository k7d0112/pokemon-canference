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

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setSearchTerm("");
      onOpenChange(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClose = () => {
    setSearchTerm("");
    onOpenChange(false);
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
        </div>
      </DialogContent>
    </Dialog>
  );
}