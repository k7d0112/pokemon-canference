"use client";

import { useState, useEffect, useCallback } from "react";
import { ScrollArea } from "../components/ui/scroll-area";
import { PokemonListItem } from "../components/PokemonListItem";
import { PokemonHeroDisplay } from "../components/PokemonHeroDisplay";
import { PokemonDetailModal } from "../components/PokemonDetailModal";
import { pokemonService, type PokemonDetailWithJapanese } from "@/services/pokemonService";
import type { PokemonListResponse } from "@/api/pokemon.api";
import { Loader2, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useSearch } from "@/contexts/SearchContext";

export function ModernPokedex() {
  const [pokemonList, setPokemonList] = useState<PokemonListResponse | null>(null);
  const [allLoadedPokemon, setAllLoadedPokemon] = useState<{name: string; url: string; japaneseName?: string}[]>([]);
  const [filteredPokemon, setFilteredPokemon] = useState<{name: string; url: string; japaneseName?: string}[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetailWithJapanese | null>(null);
  const [selectedPokemonUrl, setSelectedPokemonUrl] = useState<string>("");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { searchTerm, setSearchTerm } = useSearch();
  const [loading, setLoading] = useState(true);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const handlePokemonSelect = useCallback(async (pokemonUrl: string) => {
    try {
      setLoadingDetail(true);
      setSelectedPokemonUrl(pokemonUrl);
      const pokemonId = pokemonService.extractIdFromResourceUrl(pokemonUrl);
      if (!pokemonId) throw new Error('Invalid Pokemon URL');
      const pokemonDetail = await pokemonService.getPokemonDetailWithJapaneseName(pokemonId);
      setSelectedPokemon(pokemonDetail);
    } catch (error) {
      console.error('ポケモン詳細の取得に失敗しました:', error);
    } finally {
      setLoadingDetail(false);
    }
  }, []);

  useEffect(() => {
    loadPokemonList();
  }, []);

  // ポケモンリストが更新されたら、日本語名を取得
  useEffect(() => {
    if (pokemonList && pokemonList.results.length > 0) {
      const loadJapaneseNames = async () => {
        const pokemonWithJapaneseNames = await Promise.all(
          pokemonList.results.map(async (pokemon) => {
            const pokemonId = pokemonService.extractIdFromResourceUrl(pokemon.url);
            if (pokemonId) {
              const japaneseName = await pokemonService.getPokemonNameInJapanese(pokemonId);
              return { ...pokemon, japaneseName };
            }
            return pokemon;
          })
        );
        setAllLoadedPokemon(pokemonWithJapaneseNames);
      };
      loadJapaneseNames();
    }
  }, [pokemonList]);

  useEffect(() => {
    // TODO: 実装課題3 - 検索フィルタリング処理
    // ここに検索フィルタリングロジックを実装してください
    // 要件:
    // - searchTermがある場合のみフィルタリング
    // - 英語名（pokemon.name）と日本語名（pokemon.japaneseName）の両方で部分一致検索
    // - 大文字小文字を区別しない
    // - フィルタリング結果をsetFilteredPokemonで更新
    // - 検索結果の最初のポケモンを自動選択
  }, [allLoadedPokemon, searchTerm, selectedPokemon, handlePokemonSelect]);

  const loadPokemonList = async () => {
    try {
      setLoading(true);
      const data = await pokemonService.getPokemonList(24, 0); // 適切な数のポケモンを読み込み
      setPokemonList(data);
    } catch (error) {
      console.error('ポケモンリストの取得に失敗しました:!!!!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInfoClick = () => {
    setIsDetailModalOpen(true);
  };

  const loadMorePokemon = async () => {
    // TODO: 実装課題1 - 追加読み込み機能
    // ここに「もっと見る」ボタンクリック時の追加読み込み処理を実装してください
    // ヒント:
    // - 現在のポケモンリストの長さを取得
    // - pokemonServiceを使って次の24件を取得
    // - 既存のリストに追加
    // - ローディング状態の管理
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 上部: 選択中のポケモン表示 */}
        <div className="h-1/2 relative overflow-hidden">
          {loadingDetail ? (
            <div className="flex items-center justify-center h-full bg-white">
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin text-gray-600 mb-2 mx-auto" />
                <p className="text-gray-500">読み込み中...</p>
              </div>
            </div>
          ) : (
            <PokemonHeroDisplay
              pokemon={selectedPokemon}
              onInfoClick={handleInfoClick}
            />
          )}
        </div>

        {/* 下部: ポケモンリスト */}
        <div className="h-1/2 bg-white flex flex-col">
          <div className="flex-shrink-0 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              {/* TODO: 実装課題3 - 検索結果表示とクリアボタンUI */}
              {/* ここに検索結果の表示とクリアボタンを実装してください */}
              {/* 要件: */}
              {/* - searchTermがある場合は「○○の検索結果:」を表示 */}
              {/* - フィルタリングされたポケモン数を表示 */}
              {/* - searchTermがある場合はクリアボタンを表示 */}
              {/* - クリアボタンクリックでsetSearchTerm("")を実行 */}
              <div className="flex items-center gap-2">
                <p className="text-gray-700">
                  {filteredPokemon.length}匹のポケモン
                </p>
              </div>
              <span className="text-gray-500 text-sm">音順</span>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="px-4 py-2 space-y-1">
              {loading && filteredPokemon.length === 0 ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-gray-600" />
                </div>
              ) : (
                <>
                  {filteredPokemon.map((pokemon) => (
                    <PokemonListItem
                      key={pokemon.name}
                      name={pokemon.name}
                      url={pokemon.url}
                      onClick={() => handlePokemonSelect(pokemon.url)}
                      isSelected={selectedPokemonUrl === pokemon.url}
                    />
                  ))}

                  {/* TODO: 実装課題1 - もっと見るボタンUI */}
                  {/* ここに「もっと見る」ボタンのUIを実装してください */}
                  {/* 要件: */}
                  {/* - 151匹未満の場合のみ表示 */}
                  {/* - ローディング中は「読み込み中...」とスピナーを表示 */}
                  {/* - loadMorePokemon関数を呼び出す */}
                </>
              )}

              {/* 検索結果なし */}
              {filteredPokemon.length === 0 && !loading && searchTerm && (
                <div className="text-center py-8">
                  <p className="text-gray-500">「{searchTerm}」に一致するポケモンが見つかりませんでした。</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* ポケモン詳細モーダル */}
      <PokemonDetailModal
        pokemon={selectedPokemon}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
      />
    </div>
  );
}

export default ModernPokedex;