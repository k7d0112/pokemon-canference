"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import type { PokemonDetailWithJapanese } from "@/services/pokemonService";
import { getTypeColor, capitalizeFirstLetter, formatPokemonId, getStatNameInJapanese, getStatMaxValue, getTypeNameInJapanese } from "@/utils/pokemonNameMap";
import { ImageWithFallback } from "./ImageWithFallback";

type PokemonDetailModalProps = {
  pokemon: PokemonDetailWithJapanese | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PokemonDetailModal({
  pokemon,
  isOpen,
  onClose,
}: PokemonDetailModalProps) {
  if (!pokemon) return null;

  const paddedId = formatPokemonId(pokemon.id);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            #{paddedId} {pokemon.japaneseName || capitalizeFirstLetter(pokemon.name)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* ポケモン画像 */}
          <div className="text-center">
            <ImageWithFallback
              src={pokemon.sprites.other?.["official-artwork"]?.front_default || ""}
              fallbackSrc={pokemon.sprites.front_default || ""}
              alt={pokemon.name}
              className="w-32 h-32 mx-auto object-contain"
            />
          </div>

          {/* TODO: 実装課題2 - ポケモンタイプ表示UI */}
          {/* ここにポケモンのタイプを表示するUIを実装してください */}
          {/* 要件: */}
          {/* - pokemon.typesをmapでループ処理 */}
          {/* - Badgeコンポーネントを使用 */}
          {/* - getTypeColorでタイプ別の背景色を設定 */}
          {/* - getTypeNameInJapaneseで日本語名を表示 */}

          {/* 基本情報 */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-muted-foreground">身長</p>
              <p>{(pokemon.height / 10).toFixed(1)} m</p>
            </div>
            <div>
              <p className="text-muted-foreground">体重</p>
              <p>{(pokemon.weight / 10).toFixed(1)} kg</p>
            </div>
          </div>

          {/* TODO: 実装課題2 - ステータス表示UI */}
          {/* ここにポケモンのステータスを表示するUIを実装してください */}
          {/* 要件: */}
          {/* - pokemon.statsをmapでループ処理 */}
          {/* - ステータス名をgetStatNameInJapaneseで日本語化 */}
          {/* - Progressコンポーネントでプログレスバー表示 */}
          {/* - getStatMaxValueで最大値を取得してパーセンテージ計算 */}
        </div>
      </DialogContent>
    </Dialog>
  );
}
